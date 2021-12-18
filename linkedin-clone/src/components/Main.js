import React, { useEffect } from 'react'
import styled from 'styled-components'
import PostModal from './PostModal'
import { useState } from 'react'
import { connect } from 'react-redux'
import { getArticlesAPI } from '../actions'
import ReactPlayer from 'react-player'


const Main = (props) => {
    const [showModal, setShowModal] = useState('close');
    useEffect(() => {
        props.getArticles();
    }, [])

    const handleClick = (e) => {
        e.preventDefault();
        if(e.target !== e.currentTarget){
            return;

        }
        switch( showModal ){
            case 'open':
                setShowModal('close');
                break
            case 'close':
                setShowModal('open');
                break
            default:
                setShowModal('close');
                break
        }

    }

    
    return (
        <> {
            props.articles.length === 0 ?
            <p>There are no articles to show</p>
            :
        <Container>
            <ShareBox>
            <div>
                {
                props.user && props.user.photoURL ? (
                <img src={props.user.photoURL}/>
                ) : (
                <img src="/img/user.svg" alt=""/>
                )}    
                    <button disabled={props.loading ? true : false} onClick={handleClick}>Start a post</button>
                </div>
                <div>
                    <button>
                        <img src="/img/psdshoto.svg" alt=""/>
                        <span>Photo</span>
                    </button>
                    <button>
                        <img src="/img/event" alt=""/>
                        <span>Video</span>
                    </button>
                    <button>
                        <img src="/img/event" alt=""/>
                        <span>Event</span>
                    </button>
                    <button>
                        <img src="/img/event" alt=""/>
                        <span>Article</span>
                    </button>
                </div>
            </ShareBox>
            <Content>
                {
                    props.loading && <img src="https://miro.medium.com/max/1220/1*LiVmFmiKnrt9VQ2lLatAfg.gif"/>
                }

                {
                    props.articles.length > 0 &&
                    props.articles.map((article, key) => (
                        <Article key ={key}>
                        <SharedActor>
                            <a>
                                <img src={article.actor.image} alt=""/>
                                <div>
                                    <span>
                                        {article.actor.title}
                                    </span>
                                    <span>
                                        {article.actor.description}
                                    </span>
                                    <span>
                                        {article.actor.date.toDate().toLocaleDateString()}
                                    </span>
                                </div>
                            </a>
                            <button>
                                <img src="sadasd" alt=""/>
                                ...
                            </button>
                        </SharedActor>
                        <Description>
                            {article.decription}
                        </Description>
                        <SharedImage>
                            <a>
                                {
                                    !article.sharedImg && article.video ? <ReactPlayer width={'100%'} url={article.video}/>
                                :
                                (
                                    article.sharedImg && <img src={article.sharedImg}/>
                                )
                                }
                            </a>
                        </SharedImage>
                        <SocialCounts>
                            <li>
                                <button>
                                    <img src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb" alt=""/>
                                    <img src="https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f" alt=""/>
                                    <span>75</span>
                                </button>
                            </li>
                            <li>
                                <a>
                                    {article.comments}
                                </a>
                            </li>
                        </SocialCounts>
                        <SocialActions>
                            <button>
                                <img src="data:image/png;base64,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" alt=""/>
                                <span>Like</span>
                            </button>
                            <button>
                                <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/comment-4393990-3644061.png" alt=""/>
                                <span>Comments</span>
                            </button>
                            <button>
                                <img src="https://listimg.pinclipart.com/picdir/s/575-5754016_share-icon-svg-clipart.png" alt=""/>
                                <span>Share</span>
                            </button>
                            <button>
                                <img src="https://image.pngaaa.com/735/946735-middle.png" alt=""/>
                                <span>Send</span>
                            </button>
                        </SocialActions>
                        </Article>

                    ))
                }

            </Content>
            <PostModal showModal={showModal} handleClick={handleClick}/>
        </Container>
        }
        </>
    )
}

const Container = styled.div`
    grid-area: main;
`

const CommonCard = styled.div`
    text-align: center;
    overflow: hidden;
    margin-bottom: 8px;
    background-color: #fff;
    border-radius: 5px;
    position: relative;
    border: none;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`

const ShareBox = styled(CommonCard)`
    display: flex;
    flex-direction: column;
    color: #958b7b;
    margin: 0 0 8px;
    background: white;
    div{
        button{
            outline: none;
            color: rgba(0, 0, 0, 0.6);
            font-size: 14px;
            line-height: 1.5;
            min-height: 48px;
            background: transparent;
            border: none;
            display: flex;
            align-items: center;
            font-weight: 600;
        }
        &:first-child{
            display: flex;
            align-items: center;
            padding: 8px 16px 0px 16px;
            img{
                width: 48px;
                border-radius: 50%;
                margin-right: 8px;
            }
            button{
                margin: 4px 0;
                flex-grow: 1;
                border-radius: 35px;
                padding-left: 16px;
                border: 1px solid rgba(0, 0, 0, 0.15);
                background-color: white;
                text-align: left;
            }
        }

        &:nth-child(2){
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            padding-bottom: 4px;

            button{
                img{
                    margin: 0 4px 0 -2px;
                }
                span{
                    color: #70b5f9;
                }
            }
        }
    }
`

const Article = styled(CommonCard)`
    padding: 0;
    margin: 0 0;
    overflow: visible;
`

const SharedActor = styled.div`
    padding-right: 40px;
    flex-wrap: nowrap;
    padding: 12px 16px 0;
    margin-bottom: 8px;
    align-items: center;
    display: flex;

    a{ 
        margin-right: 12px;
        flex-grow: 1;
        overflow: hidden;
        display: flex;
        text-decoration: none;

        img{
            width: 47px;
            height: 47px;
        }
        & > div{
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            flex-basis: 0;
            margin-left: 8px;
            overflow: hidden;

            span{
                text-align: left;
                &:first-child{
                    font-size: 14px;
                    font-weight: 700;
                    color: rgba(0, 0, 0, 1);
                }
                &:nth-child(n+1){
                    font-size: 12px;
                    color: rgba(0, 0, 0, 0.6);
                }
            }
        }
    }

    button{
        position:absolute;
        right: 12px;
        top: 0;
        background: transparent;
        border: none;
        outline: none;
        font-weight: 700;
        font-size: 30px;
    }
`

const Description = styled.div`
    padding: 0 16px;
    overflow: hidden;
    color: rgba(0, 0, 0, 0.9);
    font-size: 14px;
    text-align: left;

`
const SharedImage = styled.div`
    margin-top: 8px;
    width: 100%;
    display: block;
    position: relative;
    background-color: #f9fafb;

    img{
        object-fit: contain;
        width: 100%;
        height: 100%auto;
    }
`

const SocialCounts = styled.ul`
    line-height: 1.3;
    display: flex;
    align-items: flex-start;
    overflow: auto;
    margin: 0 16px;
    padding: 8px 0;
    border-bottom: 1px solid #e9e5df;
    list-style: none;

    li{
        margin-right: 5px;
        font-size: 12px;
        button{
            display: flex;
            border: none;
            background-color: white;;
        }
    }

`
const SocialActions = styled.div`
    align-items: center;
    display: flex;
    justify-content: flex-start;
    
    margin: 0;
    min-height: 40px;
    padding: 4px 8px;
    button{
        border:none;
        background-color: white;
        display: inline-flex;
        align-items: center;
        padding: 8px 12px;
        color: #0a66c2;
        height: 32px;
        img{
            width: 20px;
        }
        @media (min-width: 768px){
            span{
                margin-left: 8px;
            }
        }
    }
`

const Content = styled.div`
    text-align: center;

    & > img {
        width: 300px;
    }
`

const mapStateToProps = (state) => {
    return{
        loading: state.articleState.loading,
        user : state.userState.user,
        articles: state.articleState.articles
    }
}

const mapDispatchToProps = (dispatch) => ({
    getArticles: () => dispatch(getArticlesAPI())
})


export default connect(mapStateToProps, mapDispatchToProps)(Main);
