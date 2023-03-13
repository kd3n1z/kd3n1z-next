import '@fortawesome/fontawesome-free/css/all.min.css';

export default function MenuCloseButton(props: {icon: string, rotated: boolean, setOpened: React.Dispatch<React.SetStateAction<boolean>>, action: boolean}) {
    return (
        <i className={'menuCloser' + (props.rotated ? ' rotated ' : ' ') + props.icon} onClick={() => {props.setOpened(props.action)}}/>
    );
};