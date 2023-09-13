import Layout from "@/components/Layout";
import { NextPage } from "next";
import { useEffect, useState } from "react";


interface Props {
    data?: any,
    rdata?: any,
    qname?: string
}

const Page: NextPage<Props> = function ({ data, rdata, qname }) {
    const [downloadLink, setDownloadLink] = useState<string>("#");
    const [extension, setExtension] = useState<string>('');

    useEffect(() => {
        if (data && rdata) {
            let dl = '#';
            let cExt = '';
            for (let asset of rdata.assets) {
                dl = asset.browser_download_url;
                let ext = asset.name.split('.').slice(-1)[0];
                if (ext && ext.length == 3) {
                    cExt = ' .' + ext.toUpperCase();
                }
                if (asset.name.endsWith('.exe') || asset.name.toLowerCase() == 'windows-x64.zip') {
                    break;
                }
            }
            setDownloadLink(dl);
            setExtension(cExt);
        }
    }, [rdata]);

    return (
        <Layout title={qname}>
            <div className='content app'>
                {data == null ? "App not found! (maybe you're making too many requests?)" :
                    (
                        <>
                            <div className="logo">
                                {
                                    qname?.replaceAll("-", " ").split('').map((letter, index) => {
                                        return (<div className="letter" key={index}>{letter == " " ? <>&nbsp;</> : letter}</div>)
                                    })
                                }
                            </div>
                            <div className="desc">
                                {
                                    data.description?.split(' ').map((word: string, index: number) => {
                                        return (<div className="word" key={index}>{word == " " ? <>&nbsp;</> : word}</div>)
                                    })
                                }
                            </div>
                            <a className="download" href={downloadLink}>Download {extension} <span className="nowrap">({rdata.name.toLowerCase()})</span></a>
                            <div className="links appInfo">
                                <a href={'https://github.com/KD3n1z/' + data.name + '/releases'}>releases</a>
                                <span>&nbsp;/&nbsp;</span>
                                <a href={'https://github.com/KD3n1z/' + data.name + '/blob/' + data.default_branch + '/LICENSE'}>{data.license.key.toUpperCase()} license</a>
                                <span className="optional">&nbsp;/&nbsp;</span>
                                <a className="optional" href={'https://github.com/KD3n1z/' + data.name}>made with {data.language}</a>
                            </div>
                        </>
                    )
                }
            </div>
        </Layout>
    )
}

Page.getInitialProps = async ({ query }) => {
    let headers = undefined;

    if (process?.env?.GITHUB_TOKEN) {
        //server-side
        headers = {
            "Authorization": "Bearer " + process.env.GITHUB_TOKEN
        };
    }

    const resp = await fetch('https://api.github.com/repos/KD3n1z/' + query.name, { headers: headers });

    if (resp.ok) {
        const releaseResp = await fetch('https://api.github.com/repos/KD3n1z/' + query.name + '/releases/latest', { headers: headers });

        if (releaseResp.ok) {
            const data = await resp.json();
            const rdata = await releaseResp.json();
            return { data, rdata, qname: query.name as string | undefined };
        }
    }
    return { data: null };
}

export default Page;