import React from 'react'
import { cx } from '../../../../../Utils/classnames'
import classes from './PostTypeTwo.module.css'
import { BsCalendar } from 'react-icons/bs';
import moment from 'moment'
import AnimatedBlock from '../../../../Animation/AnimatedBlock/AnimatedBlock';
import MDEditor from '@uiw/react-md-editor';

const PostTypeTwo = (props) => {
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
                <div className={cx(classes.block, index % 2 === 0 ? "" : classes.notEven)}>
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
                        {/* {currentLanguage === "ua" &&
                            post.paragraphs_ua[index].split("\n").map(item => (
                                <p className={classes.text}>{item}</p>
                            ))
                        } */}
                    </div>
                </div>
            ))}
        </AnimatedBlock>
    )
}

export default PostTypeTwo