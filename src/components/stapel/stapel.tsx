import * as React from 'react';
import { useState, useMemo } from 'react';
import {sendRequest} from "../helper";
interface NpxStapelProps {
  workspace_id: string;
  username: string;
  scale_id: string;
  axis_limit: number;
  buttonColor?: string;
  scale_name: string;
  no_of_responses: string; 
}

const NpxStapel: React.FC<NpxStapelProps> = (props) => {
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const [responseReceived, setResponseReceived] = useState<boolean>(false);

  const generateArray = (number: number): number[] => {
    const result: number[] = [];

    for (let i = -number; i <= number; i++) {
      if (i !== 0) result.push(i);
    }

    return result;
  }

  const buttonLinks = useMemo(() => generateArray(props.axis_limit), [props.axis_limit]);

  const handleButtonClick = async (index: number) => {
    setLoadingIndex(index);
    let obj={
      workspace_id: props.workspace_id,
      username:props.username,
      scale_name:props.scale_name,
      scale_type:"stapel",
      axis_limit:props.axis_limit,
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
        marginBottom: '10px',
        marginTop:"10px",
        textAlign: 'center',
        fontWeight: 'normal'
      }}>
        On a scale of -{props.axis_limit} to {props.axis_limit}, how likely are you to recommend the product to a
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
        backgroundColor: props.buttonColor || "hsl(120, 70%, 60%)",
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

export {NpxStapel};
