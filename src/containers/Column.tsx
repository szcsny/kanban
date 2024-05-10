import Ticket from '../components/Ticket';
import './Column.css';

type ColumnProps = {
    name: String
}

export default function Column(props: ColumnProps) {

    return (
        <div className="Column">
            <h3 className="column-name">{props.name} (3)</h3>
            <Ticket />
            <Ticket />
            <Ticket />
        </div>
    )
}