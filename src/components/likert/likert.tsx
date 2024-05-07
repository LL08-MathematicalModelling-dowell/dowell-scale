import { useState,useEffect,useCallback } from 'react';
import * as React from 'react';
import {sendRequest,handleMouseEnter} from "../helper";

interface NpxLikertProps {
  workspace_id: string;
  username: string;
  scale_id: string;
  pointers: number;
  buttonColor?: string;
  scale_name: string;
  no_of_responses: string; 
  
}

const NpxLikert: React.FC<NpxLikertProps> = (props) => {
  
  const getButtonData = (number: number): string[] => {
    switch(number){
      case 2:return ["😞 No", "😁 Yes"]
      case 3: return ["😞 Disagree", "😔 Can't Say", "😁 Agree"]
      case 4: return ["😞 Strongly Disagree", "😔 Disagree", "😄 Agree", "😁 Strongly Agree"]
       case 5:return ["😞 Strongly Disagree", "😔 Disagree", "😔 Neutral", "😄 Agree", "😁 Strongly Agree"]
      case 7:return ["😞 Strongly Disagree", "😌 Somewhat Disgaree", "😔 Disagree", "😐 Neutral", "🙂 Somewhat Agree", "😄 Agree", "😁 Strongly Agree"]
      case 9:return ["😁 ", "😃 ","😄 ","🙂 ", "😐 ", "😕", "😌 ", "😔 ", "😞 "]
      default: return []
    }
  }
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const [responseReceived, setResponseReceived] = useState<boolean>(false);
  const[buttonLinks,setButtonLinks]=useState<string[]>(getButtonData(props.pointers))
  const[text,setText]=useState<string>("")
  
  const handleResize=useCallback(()=>{
    if(props.pointers==7 && window.innerWidth<968)
      setButtonLinks(["😞  ", "😌  ", "😔 ", "😐 ", "🙂  ", "😄 ", "😁  "])
    else if(props.pointers==5 && window.innerWidth<670)
      setButtonLinks(["😞", "😔 ", "😐 ", "😄 ", "😁 "])
      else setButtonLinks(getButtonData(props.pointers))
    
   },[props.pointers])

useEffect(()=>{
  handleResize()
 const listener:any=window.addEventListener("resize",handleResize)
 return(()=>{
  window.removeEventListener("resize",listener)
 })
},[handleResize])


  const handleButtonClick = async (index: number) => {
    setLoadingIndex(index);
    let obj={
      workspace_id: props.workspace_id,
      username:props.username,
      scale_name:props.scale_name,
      scale_type:"likert",
      no_of_responses:props.no_of_responses,
      pointers:props.pointers,
      setLoadingIndex,
      setResponseReceived
    }
    sendRequest(obj,index)
  }

  return (
    <div>
    {responseReceived ? (
      <div style={{ 
        marginTop: '20px',
        fontSize: '1.2rem',
        color: '#007bff',
        textAlign: 'center'
      }}>
        Thanks for your response!
      </div>
    ) : (
      <>
      {props.pointers==5 && (
          <style scoped>
          {`

           .button-changes {
            padding: 10px 10px;
            font-size: 1.5rem;
            }

           @media (min-width: 670px) { 
              .button-changes {
              padding: 5px 5px;
              font-size: 1rem;
              }
            }
  
              @media (min-width: 968px) { 
              .button-changes {
                  padding: 10px 20px;
                  font-size: 1.25rem;
              }
              }
          `}
      </style>
      )}
      {props.pointers==9 && (
          <style scoped>
          {`
           .button-changes {
            padding:3px;
            font-size: 1rem;
            box-sizing: border-box;
            }

            @media (min-width: 560px) { 
              .button-changes {
              padding: 5px 5px;
              font-size: 1.5rem;
              }
            }
  
              @media (min-width: 827px) { 
              .button-changes {
                  padding: 10px 20px;
                  font-size: 1.5rem;
              }
              }
          `}
      </style>
      )}
       {props.pointers==7 &&(
      <style scoped>
              {`
              .button-changes {
                padding: 5px 5px;
                font-size:1.5rem;
                }
                 @media (min-width: 584px){
               .button-changes {
                padding: 10px 10px;
                font-size:1.5rem;
                }
              }
               @media (min-width: 968px){
               .button-changes {
                padding: 5px 5px;
                font-size:0.9rem;
                }
              }
                @media (min-width: 1057px){
                  .button-changes {
                  padding: 5px 5px;
                  font-size: 1rem;
                  }
                }
      
                  @media (min-width: 1265px) { 
                  .button-changes {
                      padding: 10px 20px;
                      font-size: 1rem;
                  }
                  }
              `}
          </style>
            )}

            {props.pointers<=4 &&
            (
              <style scoped>
              {`
                  .button-changes {
                  padding: 5px 10px;
              
                  }
      
                  @media (min-width: 792px) { 
                  .button-changes {
                      padding: 10px 20px;
                      font-size: 1.25rem;
                  }
                  }
              `}
          </style>
            )}
      <div style={{ 
        height: "50px",
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '10px',
        position:"absolute",
        left: 0,
        right: 0,
        margin: "0 auto"

      }} className='button-container'>

{buttonLinks.map((review,index)=>{
  return(
      <React.Fragment key={index}>
         
          
          <button style={{
                  fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                  backgroundColor: props.buttonColor || "hsl(120, 70%, 60%)",
                  fontWeight: 500,
                  border: "none",
                  position: "relative",
                  borderRadius: '30px',
                  cursor: 'pointer',
                  margin: '5px',
                  transition: 'background-color 0.3s ease',
                  ...(loadingIndex === index ? { pointerEvents: 'none', backgroundColor: '#0056b3' } : {}),
          }}
              onClick={() => handleButtonClick(index)}
              onMouseEnter={() => handleMouseEnter(index, props.pointers, window.innerWidth, setText)}
              onMouseLeave={() => { setText(''); }}
              disabled={loadingIndex === index}
              className='button-changes'>
           {loadingIndex === index ? (
               <>
              <style scoped>
              {`
                  @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                  }
          
                  .spinner {
                      border: 3px solid rgba(0, 0, 0, 0.1);
                      border-top: 3px solid #007bff;
                      border-radius: 50%;
                      width: 24px;
                      height: 24px;
                      animation: spin 2s linear infinite;
                  }
              `}
          </style>
          <div className="spinner"></div>
        </>

           ) : (
              review
           )}
       </button>
  
      </React.Fragment>  
  )    
      })}
       {text.length>0 && 
       <p style={{
        position: 'absolute',
        top: '30px',
        color: 'green',
        padding: '10px',
        borderRadius: '5px',
       
      
      }}>{text}</p>
       }
      </div>
      </>
    )}
  </div>
  );
};

export {NpxLikert};
