import { motion } from "framer-motion";
import Head from "next/head";

export default function Layout(props: {title?: string, children?: string | JSX.Element | JSX.Element[]}) {
    return (
        <>
            <Head>
                <title>{"kd3n1z.com - " + (props.title ?? "loading...")}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main className='page'>
                <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{ type: "tween", duration: .3 }}
                >
                    {props.children}
                </motion.div>
            </main>
        </>
    );
}