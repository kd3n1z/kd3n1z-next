import Layout from '@/components/Layout';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Home() {
    return (
        <>
            <Layout title='home'>
                <div className='row'>
                    <div className='avatar'/>
                    <div className='content'>
                        <div className='logo'>
                            {'Denis Komarkov'.split('').map((letter, index) => {
                                return (<div className='letter' key={index}>{letter == " " ? <>&nbsp;</> : letter}</div>);
                            })}
                        </div>
                        <div className='desc nowrap'>
                            {'there must be something here?'.split(' ').map((word, index) => {
                                return (<div className='word' key={index}>{word}</div>);
                            })}
                        </div>
                        <div className='links'>
                            <a className='icon fa-brands fa-telegram' href='https://t.me/k_d3n1z'/>
                            <a className='icon fa-brands fa-github' href='https://github.com/KD3n1z/'/>
                            <a className='icon fa-solid fa-mug-hot' href='https://www.buymeacoffee.com/kd3n1z'/>
                            <a className='icon fa-brands fa-steam' href='https://steamcommunity.com/id/k_d3n1z/'/>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}