import React from 'react'
import styled from 'styled-components'
import { useState} from 'react'
import ReactPlayer from 'react-player'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { postArticleAPI } from '../actions'


const PostModal = (props) => {


    const [editorText, setEditorText] = useState('')
    const [shareImage, setShareImage] = useState('')
    const [videoLink, setVideoLink] =  useState('')
    const [assetArea, setAssetArea] = useState('');

    const handleChange = (e) => {
        const image = e.target.files[0];

        if(image === '' || image === undefined){
            alert(`not an image ${typeof image }`);
            return;
        }
        setShareImage(image);
    }

    const switchAssetArea= (asset) =>{
        setShareImage('');
        setVideoLink('');
        setAssetArea(asset)
    }

    const postArticle = (e) => {
        e.preventDefault();
        if(e.target !== e.currentTarget){
            console.log("asdasd")
            return;
        }
        const payload = {
        image: shareImage,
        video : videoLink,
        user: props.user,
        description : editorText,
        timestamp: firebase.firestore.Timestamp.now(),
        }

        props.postArticle(payload);
        reset(e);
    }

    const reset = (e) => {
        setEditorText('');

        setShareImage('');
        setVideoLink('');
        setAssetArea('')

        props.handleClick(e);
    }

    return (
        <>
        { props.showModal === 'open'&&
            <Container>
                <Content>
                    <Header>
                        <h2>
                            Create a post
                        </h2>
                        <button onClick={(e) => reset(e)}>
                            <img src="https://cdn1.iconfinder.com/data/icons/ui-flat-16x16/400/cross-512.png" alt=""/>
                        </button>
                    </Header>
                    <SharedContent>
                        <UserInfo>
                            {props.user.photoURL ? <img src={props.user.photoURL}/>
                            :
                            <img src="/img/user.svg" alt=""/>
                            }
                            <span>{props.user.displayName}</span>
                        </UserInfo>
                        <Editor>
                            <textarea autoFocus={true} placeholder='Post something aspiring...' value = {editorText} onChange={(e) => setEditorText(e.target.value)}>

                            </textarea>
                            { assetArea === 'image' ? 

                            
                            <UploadImage>
                                <input type="file" accept="image/gif, image/jpeg, image/png" name='image' id="file" style={{display: "none"}}
                                onChange={handleChange}
                               />
                               <p>
                                   <label style={{cursor:"pointer"}} htmlFor="file">
                                       Select an image to share
                                   </label>
                               </p>
                               {
                                   shareImage && <img src={URL.createObjectURL(shareImage)}/>
                               }
                            </UploadImage>
                            :
                            assetArea === "media" &&
                               <>
                                <input type="text" placeholder="please input a video link" value={videoLink} onChange={(e) => setVideoLink(e.target.value)}/>
                                {
                                    videoLink && <ReactPlayer width={'100%'} url={videoLink}/>
                                }
                               </>
                            }
                        </Editor>
                    </SharedContent>
                    <ShareCreation>
                        <AttachAssest>
                            <AssetButton onClick={() => switchAssetArea('image')}>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png" alt=""/>
                            </AssetButton>
                            <AssetButton onClick={() => switchAssetArea('media')}>
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEX///8wMDAtLS0qKirx8fH39/dDQ0NoaGglJSVcXFwUFBTc3NyGhoYiIiLp6ekdHR09PT0ZGRmXl5fNzc2vr69xcXEAAABiYmLExMQ3NzdMTEwPDw/V1dXi4uKWlpaLi4t4eHirq6t/f3+6urpKSkrJycmfn59BQUGk46P5AAAE70lEQVR4nO2bf3uyIBSGFbLIIrKyH2bTaqvv/w1foNa7NkC36bCu5/5rTtQej4dzOEAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANQlahTfar6QF6us3yTDctHzLeoD8yzhlDQKZYK+dMaSxZaGLUDEZuRb2oUyaUOfgorctzjFrDWB0oxhB5xxt21PYBiy1Le+IFiZfZAwB+TaiF6PHRIT79/pzvzzSFiOrRz69Gqgy3FJiPEmus3Bt8KF+MGr702VJL5/P36zW5H0fYeMsfnHJe6rUmXEePd+2Ns4jLhz3egPSM1uyE89B2v9Wlj5fjzjVoFh4jsmDizBnjNqhVzjC+OXY+YQGMZGhX+YwNoUNoZBYW+cTW+cs5aTOw8KF/FdEkw5b9VV/17h4UuKQTdtWvGvFe4yg9OK0/MoPDLT8+jgaRQWW2PgpMMnUTgZmhOoDilUQ3cZJ+0JjFPhG7Eldx1RSLgg2eBQpKsNE/Xfy03hLLa+mU4oJMnrLH/v1HfHgXPIZFDYGzgG2l1QKDaL++t2aVzvyovCfON6I/4Vku3pFpNvf+SvrnT0XuFeOH3Xu0JKLqPFfNZny+12kx4v1ZfS0jV+VhgN4ooHeFbIsolqeezHXFuCUCEO+l+nGlaMd6Nzlc96Vkg2ymKjYfLxQ+NMJ1qzaiuyglQ+wrNC7Ujrz9kWEbqKllZbkVWHT78Kk6NsdVx+/Zk8U9efvxX+u6hQPzw3foy8lKfWFZ1I9xXGcxkgpuZGiSq2DRtIbH0qpMrbbP2J7oPM9n0chWItEy5rXyFm8g7Z743oUSEJI5WQWE9v5B1cpcTuK9SPdnhanDfymXpUyOVnGC3d53t1RxmdVChkMBw54oGePHOU9LuvMJEdzVvVwO71oRXKaHh0+JnuarKHVlhlQ5W5PbQNlR/mDj+kD++H/FTRl77I8w8d8ekqcCYtKmt97Hioc5qTPacJg3oD/e4qDIU00sSqkBdBI4MLnwpZKdsUFisRMpEJwYOPLUK1bqsXmntLPSnWxMSH3zG+6mvMIZGpU/OHH+OHsQz6wckQMZieuW1gdOhbIRGqNLr/MhcjhqrIOK72wjolZ7/VRKpXNc3Pd4V5Ksbq6n31uka64pU5j/ea90pZKzrR5DoSJHw70HX+Ra2a9zGpeoZvhSGb6uUg0boUy228Xb6eLstDijorU+NRMJpWvAnvCkMaH9/bT0a3ScRVrUioS+Zl0u25J0mSvd1f1ytqzgNf5g8XztZdUBjSZLi4LV2K5uOwbjZ6nQMenR0XdEKh6j7ZdFCcFsUhI6LGdMu9wiBK7V7bEYWhmjlkXDD2rcUY/9di7LntWd1R+BM+rKfJbVOlT6PQuiDjeRTKBNcYNp5oXZvM/qaGL1WVzp9GoelL1SPp51EYBC9LdrfNjS3nLQr0ss57l54/NDiXbVrQj0LJ5D+tygus+y2aw/t+i8PvZ//ceN8zY5/CbgYy9b3vaff7irUTXXD1SxPrYRwkb9U/oWXyVveQtppx1uXQoieSdjf81GXYmisSXU72TzSwr6L/FYz7d8Iri01CHXt5fwKhXKSt5yv1iY7pmdi3VP6A6fDFdzLzmci1Lfb7+I7zAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeDb+AZIEWD61FmqZAAAAAElFTkSuQmCC" alt=""/>
                            </AssetButton>
                        </AttachAssest>
                        <ShreComment>
                            <AssetButton>
                                <img src="https://www.pngfind.com/pngs/m/247-2474217_png-file-svg-comment-icon-transparent-png.png" alt=""/>
                                Anyone
                            </AssetButton>
                        </ShreComment>
                        <PostButton onClick={(event) => postArticle(event)} disabled={!editorText? true : false}>
                            Post
                        </PostButton>
                    </ShareCreation>
                </Content>
            </Container>
        }
        </>
    )
}

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99999;
    color:black;
    background-color: rgba(0, 0, 0, 0.7);
    animation: fadeIn 0.3s;

`

const Content = styled.div`
    width: 100%;
    max-width: 552px;
    background-color: white;
    max-height: 90%;
    overflow: initial;
    border-radius: 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    top: 32px;
    margin: 0 auto;
`
const Header = styled.div`
    display: block;
    padding: 16px 20px;
    border-bottom: 1px solid rgba(0,0,0,0.15);
    font-size: 16px;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.6);
    font-weight: 400;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img, svg{
        height: 20px;
        width: 20px;
        min-width: auto;
        color: rgba(0, 0,0, 0.15);
        pointer-events: none;
    }
`

const SharedContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    vertical-align: baseline;
    background: transparent;
    padding: 8px 12px;
`
const UserInfo = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 24px;
    svg, img{
        width: 48px;
        height: 48px;
        background-clip: content-box;
        border-radius: 50%;
        border: 2px solid transparent;

    }
    span{
        font-weight: 600;
        font-size: 16px;
        line-height: 1.5;
        margin-left: 5px;
    }
`

const ShareCreation = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 24px 12px 16px;
`

const AssetButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    min-width: auto;
    color: rgba(0,0,0, 0.5);
    img{
        width: 30px;
        height: 30px;
    }
`

const AttachAssest = styled.div`
    align-items: center;
    display: flex;
    padding-right: 8px;
    ${AssetButton}{
        width: 40px;
    }
`

const ShreComment = styled.div`
    padding-left: 8px;
    margin-right: auto;
    border-left: 1px solid rgba(0, 0, 0, 0.15);
    ${AssetButton}{
        img{
            margin-right: 5px;
        }
    }
`

const PostButton = styled.button`

    min-width: 60px;
    border-radius: 20px;
    padding-left: 16px;
    padding-right: 16px;
    background: ${props => (props.disabled? 'rgba(0, 0, 0, 0.8)' : "#0a66c2")};
    color: ${(props) => (props.disabled ? 'rgba(1, 1, 1, 0.2)' : 'white')};
    &:hover{
        background: ${(props) => (props.disabled ? 'rgba(0, 0, 0, 0.08)' : '#004182')};
    }
`

const Editor = styled.div`
    padding: 12px 24px;
    textarea{
        width: 100%;
        min-height: 100px;
        resize: none;
    }

    input{
        width: 100%;
        height: 35px;
        font-size: 16px;
        margin-bottom: 20px;
    }

`

const UploadImage = styled.div`
    text-align: center;
    img{
        width: 100%;
    }
`

const mapStateToProps = (state) => {
    return{
        user: state.userState.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    postArticle: (payload) => dispatch(postArticleAPI(payload)),
    
})



export default connect(mapStateToProps, mapDispatchToProps)(PostModal)
