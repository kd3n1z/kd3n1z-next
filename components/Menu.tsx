import Link from "next/link";
import { useEffect, useState } from "react";
import MenuCloseButton from "./MenuCloseButton";
import MenuCategory from "./MenuCategory";

interface IDataDocument {
    categories: ICategory[]
}

export interface ICategory {
    name: string
    pages: IPage[]
}

export interface IPage {
    type: "github_repo" | "link"
    name: string,
    link?: string
}


interface Props {
    repos?: any,
}

export default function Menu(props: { opened: boolean, setOpened: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [repos, setRepos] = useState<IDataDocument | null>(null);
    const [openedCategory, setCategory] = useState<string>("");

    const closeMenu = () => {
        props.setOpened(false);
        setCategory("");
    }

    useEffect(() => {
        fetch('/data.json').then(resp => resp.json()).then(data => {
            setRepos(data);
        });
    }, []);

    return (
        <>
            <MenuCloseButton rotated={props.opened} setOpened={props.setOpened} action={true} icon="fa-solid fa-bars" />
            <div className={'menuBlur' + (props.opened ? '' : ' hidden')} onClick={() => { props.setOpened(false) }} />
            <div className={'menu' + (props.opened ? '' : ' hidden')}>
                <MenuCloseButton rotated={props.opened} setOpened={props.setOpened} action={false} icon="fa-solid fa-xmark" />
                <Link href='/' className="menuButton" onClick={() => { props.setOpened(false) }}>Home</Link>
                {repos?.categories.map((category: ICategory) => {
                    return (<MenuCategory category={category} closeMenu={closeMenu} openedCategory={openedCategory} openCategory={setCategory} />);
                })}
            </div>
        </>
    );
};