import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { cx } from '../../../../../Utils/classnames'
import classes from './HgTag.module.css'

const HgTag = (props) => {
    const { 
        tag, 
        currentLanguage,
        index
    } = props

    const [blockIndex, setBlockIndex] = useState(0)

    const navigate = useNavigate()

    useEffect(() => {
        if(index === 0) {
            setBlockIndex(0)
        }else if(index === 1) {
            setBlockIndex(1)
        }else if(index === 2) {
            setBlockIndex(2)
        }else if(index === 3) {
            setBlockIndex(0)
        }else if(index === 4) {
            setBlockIndex(1)
        }
    }, [])

    const handleClick = () => {
        navigate(`/catalog?pageNumber=1&pageSize=25&searchBy=tags&from=desc&searchValue=${tag._id}`)
    }

    return (
        <div onClick={handleClick} className={cx(classes.main, classes[`block${blockIndex}`])}>
            <p>{currentLanguage === "ru" ? tag.name : tag.name_ua}</p>
        </div>
    )
}

let mapStateToProps = (state) => ({
    currentLanguage: state.common.currentLanguage
})

export default connect(mapStateToProps, null)(HgTag)