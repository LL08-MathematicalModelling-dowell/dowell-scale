import { useState } from 'react';
import * as React from 'react';
interface NpxLikertProps {
  workspace_id: string;
  username: string;
  scale_id: string;
  pointers: number;
  buttonColor?: string;
}

const NpxLikert: React.FC<NpxLikertProps> = (props) => {
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const [responseReceived, setResponseReceived] = useState<boolean>(false);

  const getButtonData = (number: number): string[] => {
    switch (number) {
      case 2: return ["😞 No", "😁 Yes"];
      case 3: return ["😞 Disagree", "😔 Can't Say", "😁 Agree"];
      case 4: return ["😞 Strongly Disagree", "😔 Disagree", "😄 Agree", "😁 Strongly Agree"];
      case 5: return ["😞 Strongly Disagree", "😔 Disagree", "😔 Neutral", "😄 Agree", "😁 Strongly Agree"];
      case 7: return ["😞 Strongly Disagree", "😌 Somewhat Disagree", "😔 Disagree", "😐 Neutral", "🙂 Somewhat Agree", "😄 Agree", "😁 Strongly Agree"];
      case 9: return ["😁 Strongly Agree", "😄 Agree", "😀 Moderately Agree", "🙂 Mildly Agree", "😐 Neither Agree nor Disagree", "😌 Mildly Disagree", "😕 Moderately Disagree", "😔 Disagree", "😞 Strongly Disagree"];
      default: return [];
    }
  }

  const data = getButtonData(props.pointers);

  const handleButtonClick = async (index: number) => {
    setLoadingIndex(index);
    try {
      const response = await fetch(
        `https://100035.pythonanywhere.com/addons/create-response/?workspace_id=${props.workspace_id}&username=${props.username}&scale_id=${props.scale_id}&item=${index}`
      );
      const data = await response.json();
      console.log(data);
      setResponseReceived(true);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoadingIndex(null);
    }
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
          <div style={{
            height: "50px",
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px',
          }} className='button-container'>
            {data.map((review, index) => (
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
                  disabled={loadingIndex === index}
                  className='button-changes'
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
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export {NpxLikert};
