import React from 'react'
import classes from './PostTypeOne.module.css'
import { BsCalendar } from 'react-icons/bs';
import moment from 'moment'
import { cx } from '../../../../../Utils/classnames'
import AnimatedBlock from '../../../../Animation/AnimatedBlock/AnimatedBlock';
import MDEditor from '@uiw/react-md-editor';

const PostTypeOne = (props) => {
    const { post, currentLanguage } = props

    return (
        <AnimatedBlock className={classes.main}>
            <div className={classes.header}>
                <h4>{currentLanguage === "ru" ? post.title : post.title_ua}</h4>
                <div className={classes.date}>
                    <BsCalendar/>
                    <span>{moment(post.created_at).format("DD/MM/YYYY")}</span>
                </div>
            </div>
            {post.images.map((el, index) => (
                <div className={cx(classes.block)}>
                    <div className={classes.imageBlock}>
                        <img src={el} alt="image" referrerpolicy="no-referrer"/>
                    </div>
                    <div className={classes.blockText}>
                        <MDEditor.Markdown
                            source={post.paragraphs_ua[index]}
                            style={{
                                whiteSpace: 'pre-wrap', 
                                background: 'transparent', 
                                color: "white", 
                                fontFamily: "Montserrat",
                            }}
                        />
                    </div>
                </div>
            ))}
        </AnimatedBlock>
    )
}

export default PostTypeOne