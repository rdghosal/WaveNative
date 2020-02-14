import React, { useContext, useState, Fragment } from 'react'
import { GlobalContext } from './GlobalContext'
import Wave from './Wave';
import WaveTypes from './WaveTypes';
import { Link } from 'react-router-dom';

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
        <div className="container-fluid session-wordlist">
            <div className="row justify-content-left session-wordlist__header">
                <h2>Your last searches</h2>
            </div>
            <div className="row h-100 justify-content-center">
                { 
                    wordList.length > 0
                        ?   <>
                                <div className="col-sm-2 align-self-center">
                                    <table className="table table-borderless">
                                        <thead></thead>
                                        <tbody>
                                            {
                                                wordList.map((word, i) => <tr key={i} onClick={() => toggleWord(i) }><td key={i}>{ word.word }</td></tr>)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-sm-9 align-self-center">
                                    <div className="wave-container container">
                                        <div className="row justify-content-center">
                                            { 
                                                currentWord
                                                    ? <Wave word={currentWord} allowRecording={false} type={WaveTypes.native} />
                                                    : <p className="instructions">Click a word to hear its wave and yours!</p>
                                            }
                                        </div>
                                        <div className="row justify-content-center">
                                            { 
                                                currentWord && currentWord.userData &&
                                                    <Wave word={currentWord} allowRecording={false} type={WaveTypes.playback} />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </>
                    :   <>
                            <div className="col text-center">
                                <p className="fallback-text">Let's go <Link to="/search">search</Link> for some waves!</p>
                            </div>
                        </>
                }
            </div>
        </div>
        );
    }

    export default SessionWordList
