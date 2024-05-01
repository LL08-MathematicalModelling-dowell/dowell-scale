import * as React from 'react';
import { useState, useMemo } from 'react';

interface NpxStapelProps {
  workspace_id: string;
  username: string;
  scale_id: string;
  axis_limit: number;
  buttonColor?: string;
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

  const arr = useMemo(() => generateArray(props.axis_limit), [props.axis_limit]);

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
            marginTop: '5px',
            width: "100%",
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: "center",
          }}>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: "center",
              backgroundColor: props.buttonColor || "orange",
              gap: '10px',
              width: "max-content",
              padding: "10px",
              borderRadius: "4px"
            }} className='button-container'>
              {arr.map((number) => (
                <React.Fragment key={number}>
                  <button
                    style={{
                      fontSize: '0.9rem',
                      border: 'none',
                      borderRadius: "50%",
                      cursor: 'pointer',
                      color: "orange",
                      fontWeight: 600,
                      transition: 'background-color 0.3s ease',
                      ...(loadingIndex === number ? { pointerEvents: 'none', backgroundColor: '#0056b3' } : {}),
                    }}
                    className='button-changes'
                    onClick={() => handleButtonClick(number)}
                    disabled={loadingIndex === number}
                  >
                    {loadingIndex === number ? (
                      <>
                        <div className="spinner"></div>
                      </>
                    ) : (
                      String(number)
                    )}
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export {NpxStapel};
