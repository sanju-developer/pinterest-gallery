import React, { useState, useEffect } from 'react';
// import { InfiniteLoader, List } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
import { photoGalleryService } from '../../services/photoGallery';
import InfiniteScroll from "react-infinite-scroll-component";
import Modal from '../Modal';

const style = {
    height: '20%',
    border: "1px solid",
    margin: 16,
    padding: 16,
    width: '20%',
    // margin: 'auto',
};

const container = {
    // margin: 16,
    padding: 16,
    textAlign: 'center'
}

// This example assumes you have a way to know/load this information
export default function PhotoGallery() {
    const remoteRowCount = 100
    const [list, setList] = useState([]);
    let [page, setPage] = useState(1)
    const [isApiLoading, setIsApiLoading] = useState(false)
    const [modalOpen, setOpenModal] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)

    useEffect(async () => {
        const listdata = await photoGalleryService(1)
        setList(listdata)
        setIsApiLoading(false)
    }, [])

    useEffect(async () => {
        if (page > 1) {
            const listdata = await photoGalleryService(page)
            setList([...list, ...listdata])
            setIsApiLoading(false)
        }
    }, [page])

    // function isRowLoaded({ index }) {
    //     return !!list[index];
    // }

    // const loadMoreRows = async ({ startIndex, stopIndex }) => {
    // console.log(startIndex)
    // if (startIndex) {
    //     const data = await photoGalleryService(startIndex)
    //     setList([...list, data])
    // }
    // }

    // const loadMoreRows = async (data) => {
    //     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !isApiLoading) {
    //     }
    // }

    const handlescroll = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !isApiLoading) {
            // you're at the bottom of the page
            setIsApiLoading(true)
            setPage(page => page + 1)
        }
    };

    // const rowRenderer = ({ key, index, style }) => {
    //     return (list[index] &&
    //         <div key={`${list[index].id + 'test' + index}`} style={style}>
    //             <p>{list[index].title}</p>
    //             <img
    //                 key={`${list[index].id + 'test'}`}
    //                 style={style}
    //                 src={list[index].thumbnailUrl}
    //             />
    //         </div>
    //     )
    // }

    const openModalHandler = (ind) => {
        setOpenModal(true)
        setSelectedIndex(ind)
    }

    // Render your list
    return (
        <div style={container} className={`${modalOpen ? 'backdrop' : ''}`} id="photo-gallery">
            <h1>Photo Gallery: {list.length}</h1>
            <InfiniteScroll
                dataLength={list.length}
                // next={loadMoreRows}
                onScroll={handlescroll}
                hasMore={true}
                loader={<h4>Loading...</h4>}
            >
                {list.length != 0 && list.map((item, i) =>
                    <img
                        key={`${item.id + 'test' + i}`}
                        style={style}
                        // src={item.urls.small}
                        src={item.thumbnailUrl}
                        onClick={() => openModalHandler(i)}
                    />
                )}
            </InfiniteScroll>
            {modalOpen && <Modal list={list} index={selectedIndex} closeModal={() => setOpenModal(false)} />}
        </div>
        // list.length != 0 &&
        // </InfiniteScroll>
        //     isRowLoaded={isRowLoaded}
        //     loadMoreRows={loadMoreRows}
        //     rowCount={remoteRowCount}
        // >
        //     {({ onRowsRendered, registerChild }) => (
        //         <List
        //             height={window.innerHeight}
        //             onRowsRendered={onRowsRendered}
        //             ref={registerChild}
        //             rowCount={remoteRowCount}
        //             rowHeight={50}
        //             rowRenderer={rowRenderer}
        //             width={window.innerWidth}
        //             onScroll={handlescroll}
        //         />
        //     )}
        // </InfiniteLoader>

    );
}