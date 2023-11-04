import { Dispatch, SetStateAction, useState } from "react";
import { ICategory, IPage } from "./Menu";
import Link from "next/link";

export default function MenuCategory(props: { category: ICategory, openedCategory: string, openCategory: Dispatch<SetStateAction<string>>, closeMenu: (opened: boolean) => any }) {
    const isOpened = props.openedCategory == props.category.name;

    return (
        <>
            <div className="menuButton" onClick={() => { props.openCategory(isOpened ? "" : props.category.name) }}>
                <i className={"fa-solid expandIcon rotatable " + (isOpened ? "fa-chevron-down rotated" : "fa-minus")}></i>&nbsp;
                {props.category.name}
            </div>
            <div className={"category" + (!isOpened ? " hidden" : "")}>
                <div>
                    {props.category.pages.map((page: IPage) => {
                        const innerElement: JSX.Element = (
                            <>
                                {page.icon ? <div className="icon" style={{ backgroundImage: 'url("' + page.icon + '")' }} /> : <span />}
                                <span>
                                    {page.name}
                                </span>
                            </>
                        );

                        const clickHandler = () => { props.closeMenu(false) };

                        if (page.type == "github_repo") {
                            return <Link
                                key={page.name}
                                className="menuButton"
                                href={'/app/' + page.name}
                                onClick={clickHandler}>
                                {innerElement}
                            </Link>;
                        }

                        return <a
                            key={page.name}
                            className="menuButton"
                            href={page.link}
                            target="_blank"
                            onClick={clickHandler}>
                            {innerElement}
                        </a>;
                    })}
                </div>
            </div>
        </>
    );
};