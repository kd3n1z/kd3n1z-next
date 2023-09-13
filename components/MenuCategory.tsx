import { Dispatch, SetStateAction, useState } from "react";
import { ICategory, IPage } from "./Menu";
import Link from "next/link";

export default function MenuCategory(props: { category: ICategory, openedCategory: string, openCategory: Dispatch<SetStateAction<string>>, closeMenu: () => any }) {
    const isOpened = props.openedCategory == props.category.name;

    return (
        <>
            <div className="menuButton" onClick={() => { props.openCategory(isOpened ? "" : props.category.name) }}>
                <i className={"fa-solid rotatable " + (isOpened ? "fa-chevron-down rotated" : "fa-minus")}></i>&nbsp;
                {props.category.name}
            </div>
            <div className={"category" + (!isOpened ? " hidden" : "")}>
                <div>
                    {props.category.pages.map((page: IPage) => {
                        const clickHandler = () => { props.closeMenu() };

                        if (page.type == "github_repo") {
                            return <Link
                                key={page.name}
                                className="menuButton"
                                href={'/app/' + page.name}
                                onClick={clickHandler}>
                                {page.name}
                            </Link>;
                        }

                        return <a
                            className="menuButton"
                            href={page.link}
                            target="_blank"
                            onClick={clickHandler}>
                            {page.name}
                        </a>;
                    })}
                </div>
            </div>
        </>
    );
};