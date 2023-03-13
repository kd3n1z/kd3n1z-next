import Link from "next/link";
import { useEffect, useState } from "react";
import MenuCloseButton from "./MenuCloseButton";


interface Props {
    repos?: any,
}

export default function Menu(props: {opened: boolean, setOpened: React.Dispatch<React.SetStateAction<boolean>>}) {
    const [repos, setRepos] = useState<string[]>([]);

    useEffect(() => {
        fetch('/repos.json').then(resp => resp.json()).then(data => {
            setRepos(data as string[]);
        });
    }, []);

    return (
        <>
            <MenuCloseButton rotated={props.opened} setOpened={props.setOpened} action={true} icon="fa-solid fa-bars"/>
            <div className={'menuBlur' + (props.opened ? '' : ' hidden')} onClick={() => {props.setOpened(false)}}/>
            <div className={'menu' + (props.opened ? '' : ' hidden')}>
                <MenuCloseButton rotated={props.opened} setOpened={props.setOpened} action={false} icon="fa-solid fa-xmark"/>
                <Link href='/' onClick={() => {props.setOpened(false)}}>Home</Link>
                {repos.map((repo: string) => {
                    return (<Link key={repo} href={'/app/' + repo} onClick={() => {props.setOpened(false)}}>{repo}</Link>);
                })}
            </div>
        </>
    );
};