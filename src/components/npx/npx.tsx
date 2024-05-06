import * as React from 'react';
import { useState } from "react"
import {sendRequest} from "../helper";
interface NpxScaleProps {
  workspace_id: string;
  username: string;
  scale_id: string;
  buttonColor: string;
  scale_name: string;
  no_of_responses: string; 
}

const NpxScale: React.FC<NpxScaleProps> = (props) => {
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const [responseReceived, setResponseReceived] = useState<boolean>(false);

  const buttonLinks: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleButtonClick = async (index: number) => {
    setLoadingIndex(index);
    let obj={
      workspace_id: props.workspace_id,
      username:props.username,
      scale_name:props.scale_name,
      scale_type:"nps",
      no_of_responses:props.no_of_responses,
      setLoadingIndex,
      setResponseReceived
    }
  sendRequest(obj,index)
  }

  return (
    <div>
      <h2 style={{ 
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        fontSize: '1.5rem',
        marginBottom: '20px',
        textAlign: 'center',
        fontWeight: 'normal'
      }}>
        On a scale of 0-10, how likely are you to recommend the product to a
        friend or a colleague?
      </h2>
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
        <style scoped>
        {`
          .button-container {
            height: 31px;
          }
  
          @media (min-width: 768px) { 
            .button-container {
              height: 44px;
            }
          }
        `}
      </style>
        <div style={{ 
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '10px'
        }} className='button-container'>

  {buttonLinks.map((index) => (
  <React.Fragment key={index}>
    <style scoped>
      {`
        .button-changes {
          padding: 5px 10px;
        }

        @media (min-width: 768px) { 
          .button-changes {
            padding: 10px 20px;
          }
        }
      `}
    </style>
    <button
      style={{
        fontSize: '0.9rem',
        backgroundColor: "green",
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        ...(loadingIndex === index ? { pointerEvents: 'none', backgroundColor: '#0056b3' } : {}),
      }}
      className='button-changes'
      onClick={() => handleButtonClick(index)}
      disabled={loadingIndex === index}
    >
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
                        width: 12px;
                        height: 12px;
                        animation: spin 2s linear infinite;
                    }
                `}
            </style>
            <div className="spinner"></div>
          </>
      ) : (
        index
      )}
    </button>
  </React.Fragment>
))}

        </div>
        </>
      )}
    </div>
  );
};

export {NpxScale};
