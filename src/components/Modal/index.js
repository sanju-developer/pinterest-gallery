import React, { useState, useCallback, useEffect } from 'react';
import { InfiniteLoader, List } from 'react-virtualized';
import './modal.css'

function Modal(props) {
    const { list, index, closeModal } = props
    const [currentindex, setCurrentindex] = useState(index)
    const [disabledRightArrow, setDisableRightArrow] = useState(false)
    const [disabledleftArrow, setDisabledleftArrow] = useState(false)

    useEffect(() => {
        if (currentindex == list.length - 1) {
            setDisabledleftArrow(false)
            setDisableRightArrow(true)
        }
        if (currentindex == 0) {
            setDisabledleftArrow(true)
            setDisableRightArrow(false)
        }

        if (currentindex != list.length - 1 && currentindex != 0) {
            setDisabledleftArrow(false)
            setDisableRightArrow(false)
        }
    }, [currentindex, list])

    const rightBtnHandler = useCallback(() => {
        setCurrentindex(currentindex => currentindex + 1)
    }, [currentindex])

    const leftBtnHandler = () => {
        setCurrentindex(currentindex => currentindex - 1)
    }
    function isRowLoaded({ index }) {
        return !!list[index];
    }

    const rowRenderer = ({ key, index, style }) => {
        return (<div key={key} className="modal-content" >
            <button disabled={disabledleftArrow} className="up-down" onClick={leftBtnHandler}>&#8592;</button>
            {list[currentindex].urls.small ?
                <div className="pic-container" style={{ textAlign: 'center' }}> <p>Picture: {currentindex + 1}</p>
                    <img
                        className="loaded-pic"
                        src={list[currentindex].urls.small}
                    // src={list[currentindex].thumbnailUrl}
                    /> </div> : <p>Loading...</p>}
            <button disabled={disabledRightArrow} className="up-down" onClick={rightBtnHandler}>&#8594;</button>
        </div>
        )
    }

    const loadMoreRows = async ({ startIndex, stopIndex }) => { }

    return (<>
        <div id="modal-container">
            <div className="modal-background">
                <div className="modal">
                    <div className="close">
                        <h2>Total Pictures: {list.length}</h2>
                        <button onClick={closeModal}>&#x292C;</button>
                    </div>
                    <InfiniteLoader
                        isRowLoaded={isRowLoaded}
                        loadMoreRows={loadMoreRows}
                        rowCount={1}
                    >
                        {({ onRowsRendered, registerChild }) => (
                            <List
                                height={300}
                                onRowsRendered={onRowsRendered}
                                ref={registerChild}
                                rowCount={1}
                                rowHeight={250}
                                rowRenderer={rowRenderer}
                                width={375}
                                style={{ margin: 'auto', }}
                            />
                        )}
                    </InfiniteLoader>
                </div>
            </div>
        </div >
    </>
    );
}

export default Modal;