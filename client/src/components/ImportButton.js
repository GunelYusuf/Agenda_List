import React, { useState,useContext } from "react";
import httpAgent from '../api/httpAgent';
import GlobalContext from "../context/GlobalContext";
import {
  useCSVReader,
  lightenDarkenColor,
  formatFileSize,
} from 'react-papaparse';
import { toast } from "react-toastify";


const GREY = '#CCC';
const GREY_LIGHT = 'rgba(255, 255, 255, 0.4)';
const DEFAULT_REMOVE_HOVER_COLOR = '#A01919';
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
  DEFAULT_REMOVE_HOVER_COLOR,
  40
);
const GREY_DIM = '#686868';

const styles = {
  zone: {
    alignItems: "center",
    border: `2px dashed ${GREY}`,
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    height: "7%",
    justifyContent: "center",
    padding: 12,
  },
  file: {
    background: "linear-gradient(to bottom, #EEE, #DDD)",
    borderRadius: 10,
    display: "flex",
    height: 40,
    width: '100%',
    position: "relative",
    zIndex: 10,
    flexDirection: "column",
    justifyContent: "center",
  },
  info: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    paddingLeft: 15,
    paddingRight: 15,
  },
  size: {
    backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    marginBottom: "1 em",
    justifyContent: "center",
    display: "flex",
  },
  name: {
    backgroundColor: GREY_LIGHT,
    borderRadius: 3,
    fontSize: 9,
    marginBottom: "0.5em",
  },
  progressBar: {
    bottom: 14,
    position: "absolute",
    width: "10px",
    paddingLeft: 5,
    paddingRight: 5,
  },
  zoneHover: {
    borderColor: GREY_DIM,
  },
  default: {
    borderColor: GREY,
  },
  remove: {
    height: 23,
    position: "absolute",
    right: 6,
    top: 6,
    width: 23,
  },
};

export default function CSVReader() {
  const { dispatchCalEvent,csvFromJson,setCsvFromJson,setLoading} = useContext(GlobalContext);
  const { CSVReader } = useCSVReader();
  const [zoneHover, setZoneHover] = useState(false);
  const [removeHoverColor, setRemoveHoverColor] = useState(
    DEFAULT_REMOVE_HOVER_COLOR
  );



  return (
    <CSVReader
      onUploadAccepted={(results) => {
        setLoading(false);
        const newArr = results.data.filter(
          (event) => event !== results.data[0]
        ).map(async (item) => {
          const prom = await {
            title: item[0],
            description: item[1],
            label: item[2],
            day: parseInt(item[3]),
            id: item[4],
          };
          return prom;
        });
        let errorCount = 0;
        let successCount = 0;
        Promise.all(newArr)
          .then((arr) => {
           arr.map((item) =>
             httpAgent.Agenda.postEvent(item)
                .then((res) => {
                res?.length > 0 ? successCount++ : successCount=successCount;
                 dispatchCalEvent({ type: "push", payload: item });
                 
               }).catch(() =>{
                   errorCount++;
                })
            );
          }).then(() => {
           setTimeout(()=>setLoading(true), 3000);
          })
          .catch((err) => {
            setTimeout(() => setLoading(true), 3000);
          })
          .finally(() => {
          setTimeout(() =>{
             if (errorCount === 0) {
               toast.success(
                 `${successCount} amounts events are added successfully`
               );
             }
             if (errorCount > 0 && successCount > 0) {
               toast.success(
                 `${errorCount} events could not be added. ${successCount} amounts events are added successfully. `
               );
             }
             if (successCount === 0 && errorCount > 0) {
               toast.error(
                 "There was a problem importing the file. Make sure the file is standard"
               );
             }
          },4000)
            setTimeout(() => setLoading(true), 3000);
          });

        setZoneHover(false);
      }}
      onDragOver={(event) => {
        event.preventDefault();
        setZoneHover(true);
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        setZoneHover(false);
      }}
    >
      {({
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
        Remove,
      }) => (
        <>
       
          <div
            {...getRootProps()}
            style={Object.assign(
              {},
              styles.zone,
              zoneHover && styles.zoneHover
            )}
          >
            {acceptedFile ? (
              <>
                <div style={styles.file}>
                  <div style={styles.info}>
                    <span style={styles.size}>
                      {formatFileSize(acceptedFile.size)}
                    </span>
                    <span style={styles.name}>{acceptedFile.name}</span>
                  </div>
                  <div style={styles.progressBar}>
                    <ProgressBar />
                  </div>
                  <div
                    {...getRemoveFileProps()}
                    style={styles.remove}
                    onMouseOver={(event) => {
                      event.preventDefault();
                      setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT);
                    }}
                    onMouseOut={(event) => {
                      event.preventDefault();
                      setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR);
                    }}
                  >
                    <Remove color={removeHoverColor} />
                  </div>
                </div>
              </>
            ) : (
              "Import"
            )}
          </div>
        </>
      )}
    </CSVReader>
  );
}