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
    link?: string,
    icon?: string
}


interface Props {
    repos?: any,
}

export default function Menu(props: { opened: boolean, setOpenState: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [repos, setRepos] = useState<IDataDocument | null>(null);
    const [openedCategory, setCategory] = useState<string>("");

    const setOpened = (opened: boolean) => {
        props.setOpenState(opened);

        if (!opened) {
            setCategory("");
        }
    }

    useEffect(() => {
        fetch('/data.json').then(resp => resp.json()).then(data => {
            setRepos(data);
        });
    }, []);

    return (
        <>
            <MenuCloseButton rotated={props.opened} setOpened={setOpened} action={true} icon="fa-solid fa-bars" />
            <div className={'menuBlur' + (props.opened ? '' : ' hidden')} onClick={() => { setOpened(false) }} />
            <div className={'menu' + (props.opened ? '' : ' hidden')}>
                <MenuCloseButton rotated={props.opened} setOpened={props.setOpenState} action={false} icon="fa-solid fa-xmark" />
                <Link href='/' className="menuButton" onClick={() => { props.setOpenState(false) }}><>
                    <span/>
                    <span>Home</span>
                </></Link>
                {repos?.categories.map((category: ICategory) => {
                    return (<MenuCategory key={category.name} category={category} closeMenu={setOpened} openedCategory={openedCategory} openCategory={setCategory} />);
                })}
            </div>
        </>
    );
};