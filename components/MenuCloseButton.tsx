import '@fortawesome/fontawesome-free/css/all.min.css';

export default function MenuCloseButton(props: { icon: string, rotated: boolean, setOpened: (opened: boolean) => any, action: boolean }) {
    return (
        <i className={'menuCloser rotatable' + (props.rotated ? ' rotated ' : ' ') + props.icon} onClick={() => { props.setOpened(props.action) }} />
    );
};