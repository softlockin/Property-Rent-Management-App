import React, { useEffect, useRef, useState } from 'react';
import Grid2 from "@mui/material/Unstable_Grid2";
import { Box, Typography } from '@mui/material';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

const IssueMessages = ({messagesLoaded, data}) => {
    const elRef = useRef(null)
    const [messages, setMessages] = useState([])
    const executeScroll = () => {
        elRef.current.scrollIntoView({behavior: "smooth"});
    }
    const timeAgo = new TimeAgo('en-US')

    const Message = ({data, last}) => {
        return(
            <Grid2 ref={last === true ? elRef : null} xs={12} sx={{display: "flex", justifyContent: `${data.user_type === 1 ? "flex-end" : "flex-start"}`, alignItems: "center"}}>
                <Box sx={{display: "flex", flexDirection: "column", backgroundColor: `${data.user_type === 1 ? "#e8f4fd" : "#ecf7ed"}`, padding: "7px", border: `1px solid ${data.user_type === 1 ? "#1976d2" : "#388e3c"}`, borderRadius: "10px", maxWidth: "45%"}}>
                    <Typography variant="caption" sx={{color: "#02143d"}}>
                        {timeAgo.format(new Date(data.created_at))}
                    </Typography>
                    <Typography variant="body2" sx={{wordBreak: "break-word", whiteSpace: "pre-wrap", color: "#02143d"}}>
                        {data.message}
                    </Typography>
                </Box>
            </Grid2>
        )
    }

    useEffect(()=>{
        setMessages(
           data.map((item, index, arr) => {
            if(arr.length - 1 === index){
                return(<Message key={item.id} data={item} last={true} />)
            }else{
                return(<Message key={item.id} data={item} last={false} />)
            }
           })
        );
    }, [data])

    useEffect(()=>{
        if(elRef.current === null) return;
        if(messagesLoaded){
            executeScroll()
        }
    }, [messages])

  return (
    <Grid2
    container
    sx={{width: "100%", padding: "3px", zIndex: "2", maxHeight: "320px", overflowY: "auto", margin: "0px", "::-webkit-scrollbar": {
        width: "0px",
        background: "transparent",
        }}}
    spacing={1}
    >
        {messages}
    </Grid2>
  )
}

export default IssueMessages