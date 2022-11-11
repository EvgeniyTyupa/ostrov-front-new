import classes from './Styles.module.css'
import MDEditor from '@uiw/react-md-editor';

const CustomMarkdown = (props) => {
    const { value, onChange, label } = props

    return (
        <div className={classes.main}>
            {label && <label>{label}</label>}
            <MDEditor
                value={value}
                onChange={onChange}
                className={classes.editor}
                style={{ whiteSpace: 'pre-wrap',  }}
            />
        </div>
    )
}

export default CustomMarkdown