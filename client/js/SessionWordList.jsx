import React, { useContext, useState, Fragment } from 'react'
import { GlobalContext } from './GlobalContext'
import Wave from './Wave';
import WaveTypes from './WaveTypes';

const SessionWordList = () => {

    const { wordList } = useContext(GlobalContext);
    const [ currentWord, setWord ] = useState(null);

    const renderWaves = (i) => {
        console.log(0)
        return <Wave word={wordList[i]} allowRecording={false} type={WaveTypes.native} />
    }

    const toggleWord = (i) => {
        setWord(wordList[i]);
    }

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col align-items-center">
                    <table className="table table-dark">
                        <thead></thead>
                        <tbody>
                            { 
                                wordList.length > 0 
                                    && wordList.map((word, i) => <tr key={i} onClick={() => toggleWord(i) }><td key={i}>{ word.word }</td></tr>)
                            }
                        </tbody>
                    </table>
                </div>
                <div className="col">
                    <div className="wave container">
                        <div className="row">
                            { 
                                currentWord &&
                                    <Wave word={currentWord} allowRecording={false} type={WaveTypes.native} />
                            }
                        </div>
                        <div className="row">
                            { 
                                currentWord && currentWord.userData &&
                                    <Wave word={currentWord} allowRecording={false} type={WaveTypes.playback} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SessionWordList
