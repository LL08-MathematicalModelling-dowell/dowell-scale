import * as React from 'react';
import { useState } from 'react';
import {sendRequest} from "../helper";
interface NpxLiteProps {
  workspace_id: string;
  username: string;
  scale_id: string;
  buttonColor?: string;
  scale_name: string;
  no_of_responses: string; 
}

const NpxLite: React.FC<NpxLiteProps> = (props) => {
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const [responseReceived, setResponseReceived] = useState<boolean>(false);
  const data: string[] = ["😞 No", "😔 May be", "😀 Yes"];

  const handleButtonClick = async (index: number) => {
    setLoadingIndex(index);
    let obj={
      workspace_id: props.workspace_id,
      username:props.username,
      scale_name:props.scale_name,
      scale_type:"nps_lite",
      no_of_responses:props.no_of_responses,
      setLoadingIndex,
      setResponseReceived
    }
    sendRequest(obj,index)
  };

  return (
    <div>
      <h2
        style={{
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          fontSize: '1.5rem',
          marginBottom: '10px',
          textAlign: 'center',
          fontWeight: 'normal',
          marginTop: '5px',
        }}
      >
        Do you wish to recommend this application to your friend?
      </h2>
      {responseReceived ? (
        <div
          style={{
            marginTop: '20px',
            fontSize: '1.2rem',
            color: '#007bff',
            textAlign: 'center',
          }}
        >
          Thanks for your response!
        </div>
      ) : (
        <>
          <div
            style={{
              height: '50px',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '10px',
            }}
            className="button-container"
          >
            {data.map((review, index) => {
              return (
                <React.Fragment key={index}>
                  <style scoped>
                    {`
                      .button-changes {
                        padding: 5px 10px;
                      }
        
                      @media (min-width: 768px) { 
                        .button-changes {
                          padding: 10px 20px;
                          font-size: 1.25rem;
                        }
                      }
                    `}
                  </style>

                  <button
                    style={{
                      fontFamily:
                        "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                      backgroundColor:
                        props.buttonColor || "hsl(120, 70%, 60%)",
                      fontWeight: 500,
                      border: 'none',
                      position: 'relative',
                      borderRadius: '30px',
                      cursor: 'pointer',
                      margin: '5px',
                      transition: 'background-color 0.3s ease',
                      ...(loadingIndex === index
                        ? {
                            pointerEvents: 'none',
                            backgroundColor: '#0056b3',
                          }
                        : {}),
                    }}
                    onClick={() => handleButtonClick(index)}
                    disabled={loadingIndex === index}
                    className="button-changes"
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
                      review
                    )}
                  </button>
                </React.Fragment>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export {NpxLite};
