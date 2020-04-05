import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PropTypes from 'prop-types'
import * as serviceWorker from './serviceWorker';
import {ReactComponent as File} from './images/file.svg'
import {ReactComponent as Folder} from './images/folder.svg'
import moment from 'moment';

const data = {
    fileListItems: [
        {
          name: "build",
          isFile: false,
          commitMessage: "Close #1687",
          timestamp: "2020-04-02 19:57:00"
        },
        {
            name: "file1",
            isFile: true,
            commitMessage: "Issue #1547",
            timestamp: "2020-04-03 17:45:00"
        },
    ]
}


const FileIcon = (props) => {
    const className = "icon"
    let icon
    if (props.isFile) {
        icon = <File className={className}/>
    } else {
        icon = <Folder className={className}/>
    }

    return (
        icon
    )
}

FileIcon.propTypes = {
    isFile: PropTypes.bool.isRequired
}

const FileName = (props) => {
    return (
        <div className={"name"}>
            <span>{props.name}</span>
        </div>
    )
}

FileName.propTypes = {
    name: PropTypes.string.isRequired
}

const CommitMessage = (props) => {
    return (
        <div className={"message"}>
            <span>{props.commitMessage}</span>
        </div>
    )
}

CommitMessage.propTypes = {
    commitMessage: PropTypes.string.isRequired
}

const Time = (props) => {
    const ago = moment(new Date(props.timestamp)).fromNow();

    return (
        <div className={"time"}>
            <span>{ago}</span>
        </div>
    )
}

const timestampValidator = function(props, propName, component) {
    const regex = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/
    if(!regex.test(props[propName])) {
        return new Error(`Bad prop: ${propName} supplied to component: ${component}`)
    }
}

Time.propTypes = {
    timestamp: timestampValidator
}


const FileListItem = (props) => {
    return (
        <div className={"file-list-item"}>
            <FileIcon isFile={props.info.isFile}/>
            <FileName name={props.info.name}/>
            <CommitMessage commitMessage={props.info.commitMessage}/>
            <Time timestamp={props.info.timestamp}/>
        </div>
    )
}


const FileList = (props) => {
    const items = props.fileListItems.map((itemProps, index) => {
        return (
            <FileListItem info={itemProps} key={index} />
        )
    })

    return (
        <div className={"file-list"}>
            {items}
        </div>
    )
}

FileList.propTypes = {
    fileListItems: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        isFile: PropTypes.bool.isRequired,
        commitMessage: PropTypes.string.isRequired,
        timestamp: PropTypes.string.isRequired
    }))
}


ReactDOM.render(<FileList fileListItems={data.fileListItems}/>, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
