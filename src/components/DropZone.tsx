// import { nanoid } from "nanoid";
import { useEffect, useRef, useState } from "react";
import { CMSPARENT } from "./Page";

function checkIsInside(bounds: DOMRect, coordinates: { x: number; y: number }) {
  if (!bounds || !coordinates) return false;
  return bounds.x < coordinates.x &&
    bounds.y < coordinates.y &&
    bounds.x + bounds.width > coordinates.x &&
    bounds.y + bounds.height > coordinates.y
    ? true
    : false;
}

const THRESHOLD = 20;
function checkIsNear(bounds: DOMRect, coordinates: { x: number; y: number }) {
  if (!bounds || !coordinates) return false;
  const left = bounds.x - THRESHOLD < 0 ? 0 : bounds.x - THRESHOLD;
  const right = bounds.x + bounds.width + THRESHOLD;
  const top = bounds.y - THRESHOLD < 0 ? 0 : bounds.y - THRESHOLD;
  const bottom = bounds.y + bounds.height + THRESHOLD;
  return left < coordinates.x &&
    right > coordinates.x &&
    top < coordinates.y &&
    bottom > coordinates.y
    ? true
    : false;
}

export function DropZone({ index, isParentHovered, onDrop, dataPath }: any) {
  const dropzoneRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  // Listen for postMessage events
  useEffect(() => {
    window.addEventListener("message", getMessage, false);
    return () => window.removeEventListener("message", getMessage);
  }, []);

  function getMessage(event: any) {
    if (event.origin !== CMSPARENT) return;
    if (event.data._action === "DRAGGING") {
      const bounds: any = dropzoneRef?.current?.getBoundingClientRect();
      const isNear = checkIsNear(bounds, {
        x: event.data.x,
        y: event.data.y,
      });
      const isInside = checkIsInside(bounds, {
        x: event.data.x,
        y: event.data.y,
      });
      setIsDragging(true);
      if (isNear) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
      if (isInside) {
        setIsSelected(true);
      } else {
        setIsSelected(false);
      }
    }
    if (event.data._action === "DROPPED") {
      const bounds: any = dropzoneRef?.current?.getBoundingClientRect();
      const isInside = checkIsInside(bounds, {
        x: event.data.x,
        y: event.data.y,
      });
      setIsHovered(false);
      setIsDragging(false);
      if (isInside) {
        onDrop && onDrop(event.data.component);
        const targetWindow = window.parent;
        return targetWindow.postMessage(
          {
            type: "DROPPED",
            page: window.location.pathname,
            component: event.data.component,
            dataPath,
            index,
          },
          CMSPARENT
        );
      }
    }
  }

  const dropzoneId = `contented-dropzone`;

  return (
    <>
      <div
        className={`contented-dropzone ${dropzoneId}`}
        ref={dropzoneRef}
        style={{
          // minHeight: isHovered ? "40px" : "0px",
          height: isHovered ? "40px" : "0px",
          display: isParentHovered && isDragging ? "flex" : "none",
          background: isSelected ? "#3b82f6" : "#dbeafe",
          border: isSelected ? "1px solid #3b82f6" : isHovered ? "1px dashed #3b82f6" : "",
          color: isSelected ? "white" : "#1e40af",
          alignItems: "center",
          justifyContent: "center",
          margin: "5px",
          borderRadius: "4px",
          overflow: "hidden",
          transition: "height, display",
          transitionDuration: "100ms",
        }}
      >
        Drop here
        {/* <style type="text/css">{`.${dropzoneId} + .contented-dropzone { border: 1px solid red; height: 0px !important; minHeight: 0px !important; display:none !important; }`}</style> */}
      </div>
    </>
  );
}
