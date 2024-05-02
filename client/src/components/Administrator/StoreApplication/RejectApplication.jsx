import React, {useState, useEffect, useRef} from "react";

function RejectApplication(props) {
    const [comment, setComment] = useState("");

    const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [comment]);

    const handleComment = (e)=>{
        const {value} = e.target
        setComment(value)
    }
    const handleWordCount = (e)=>{
        if(e.keyCode !== 8 && e.keyCode !== 46){
            if(comment.length >= 500){
                e.preventDefault();
            }
        }
    }

    const handleConfirmReject = ()=>{
      props.handleConfirmReject(comment);
      props.handleReject()
    }
  return (
    <div className="reject-application">
      <div>
        <h3>Reject Store: 001</h3>
        <div className="input-group">
          <textarea name="comment" value={comment} placeholder=" " onChange={handleComment} onKeyDown={handleWordCount} ref={textareaRef}></textarea>
          <span className="floating-label">Comment</span>
          <span className="word-count">{comment.length}/500</span>
        </div>
        <div className="reject-btns">
            <button onClick={handleConfirmReject} className="solid danger fade" disabled={comment === "" ? true : false}>Confirm</button>
            <button onClick={()=>{props.handleReject()}} className="solid primary fade">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default RejectApplication;
