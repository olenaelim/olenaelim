import axios from "axios";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";

var stompClient = null
const token = `Bearer ${sessionStorage.getItem("token")}`
function AuctionTest({match}) {
    const [bid, setBid] = useState();
    const [presentBid, setPresentBid] = useState('');
    const [change, setChange] = useState(false);
    const [Dto, setDto] = useState({
        itemNum: match.params.itemNum,
        auctionPrice: 0,
        nickname: '',
        email: '',
    });

    useEffect(() => {
        connect();
    }, [presentBid])

    useEffect(() => {
        axios.get(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/bidlist`)
        .then(response => {
            console.log(response.data)
            // const newBidList = [...response.data]
            setPresentBid(response.data)
        })
        .catch(error => console.log(error))
        // connect();
    }, [change])

    const connect = () => {
        let Sock = new SockJS(`http://${process.env.REACT_APP_REST_API_SERVER_IP_PORT}/ws`);
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        console.log(match.params.itemNum)
        stompClient.subscribe(`/sub/${match.params.itemNum}/bidlist`, onMessageReceived);
        // stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessage);
    }

    const onError = (err) => {
        console.log(err);
    }

    const onMessageReceived = (payload) => {
        var payloadData = JSON.parse(payload.body);
        console.log(payloadData)
        setPresentBid(payloadData.auctionPrice)
        setChange(!change);
    }

    const handlerBid = () => {
        stompClient.send(`/pub/bidlist/${match.params.itemNum}`, {Authorization: token}, JSON.stringify(Dto));
        // stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
    }

    const handlerBidPrice = e => {
        setBid(e.target.value)
        setDto({ ...Dto, "auctionPrice": e.target.value })
    }

    
    // oauth2 test
    useEffect(() => {
        axios.get("http://localhost:8080/test/login")
        .then(response => console.log(response.data))
    }, [])

    return (
        <>
            <h2>입찰</h2>
            {presentBid}
            <br></br>
            <input type="number" value={bid} onChange={handlerBidPrice}
                style={{ border: "1px solid" }}
            ></input>
            <button onClick={handlerBid}>입찰</button>
        </>
    )
}

export default AuctionTest;