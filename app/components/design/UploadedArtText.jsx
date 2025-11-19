"use client";
import { useRef, useState, useEffect, useMemo } from "react";
import { RotateCcw, X } from "lucide-react";
import { HiOutlineDuplicate } from "react-icons/hi";
import { IoIosResize } from "react-icons/io";

const UploadedArtText = ({ text, isSelected, onDrag, onResize, onRotate, onRemove, onClick, canvasRef, canvasSize, onDuplicate, getTextPath }) => {
  const textRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const pixelWidth = canvasSize?.width ? (canvasSize.width * text.width)/100 : 100;
  const pixelHeight = canvasSize?.height ? (canvasSize.height * text.height)/100 : 50;

  const pathData = useMemo(() => (text.shape && text.shape !== "none" ? getTextPath(text.text, text.shape, pixelWidth, pixelHeight) : null), [text.shape, text.text, pixelWidth, pixelHeight, getTextPath]);
  const uniquePathId = `text-path-${text.id}`;

  const getTextAnchor = () => text.align === "left" ? "start" : text.align === "right" ? "end" : "middle";
  const getDominantBaseline = () => text.verticalAlign === "top" ? "hanging" : text.verticalAlign === "bottom" ? "baseline" : "middle";
  const getStrokeWidth = (outline) => !outline || outline==="none"?0:outline.includes("thick")?3:outline.includes("medium")?2:1;
  const getStrokeColor = (outline) => !outline || outline==="none"? "none": outline.split(" ")[0];
  const getTextPosition = () => pathData? {x:"50%", y:"50%"}: text.align==="left"?{x:"0%",y:"50%"}:text.align==="right"?{x:"100%",y:"50%"}:{x:"50%",y:"50%"};

  const handleMouseDown = (e) => {
    e.stopPropagation(); e.preventDefault();
    onClick(text);
    const startX=e.clientX, startY=e.clientY;
    if(e.target.closest('.resize-handle')){setIsDragging(true); onResize?.(text.id,startX,startY,canvasRef);}
    else if(e.target.closest('.rotate-handle')){setIsDragging(true); onRotate?.(text.id,startX,startY,canvasRef);}
    else{setIsDragging(true); onDrag(text.id,startX,startY,canvasRef);}
  };
  const handleMouseUp = () => setIsDragging(false);
  useEffect(()=>{ if(isDragging){document.addEventListener('mouseup',handleMouseUp); return ()=>document.removeEventListener('mouseup',handleMouseUp);} },[isDragging]);

  return (
    <div style={{
      left:`${text.x}%`, top:`${text.y}%`, width:`${text.width}%`, height:`${text.height}%`,
      position:'absolute', zIndex:isSelected?50:text.zIndex||10, cursor:isDragging?'grabbing':'grab',
      transform:`rotate(${text.rotation}deg) scaleX(${text.flipX?-1:1}) scaleY(${text.flipY?-1:1})`,
      transformOrigin:'center center'
    }}
      onMouseDown={handleMouseDown}
      className={isSelected?'ring-2 ring-blue-500 ring-inset':''}
      ref={textRef}
    >
      <svg width="100%" height="100%" viewBox={`0 0 ${pixelWidth} ${pixelHeight}`} style={{overflow:"visible"}}>
        {pathData && <defs><path id={uniquePathId} d={pathData}/></defs>}
        <text fill={text.color} fontFamily={text.font} fontSize={text.size} fontWeight="normal"
              textAnchor={getTextAnchor()} dominantBaseline={getDominantBaseline()}
              stroke={getStrokeColor(text.outline)} strokeWidth={getStrokeWidth(text.outline)}
              style={{pointerEvents:'none'}}>
          {pathData ? <textPath href={`#${uniquePathId}`} startOffset="50%" method="align" spacing="auto">{text.text}</textPath>
          : <tspan x={getTextPosition().x} y={getTextPosition().y} alignmentBaseline="middle">{text.text}</tspan>}
        </text>
      </svg>

      {isSelected && <>
        <button className="remove-handle ..." onClick={e=>{e.stopPropagation(); onRemove(text.id);}}><X className="w-3 h-3"/></button>
        <div className="resize-handle ..."><IoIosResize className="w-3 h-3 text-white"/></div>
        <div className="rotate-handle ..."><RotateCcw className="w-3 h-3 text-blue-500"/></div>
        <button className="duplicate-handle ..." onClick={e=>{e.stopPropagation(); onDuplicate(text.id);}}><HiOutlineDuplicate className="w-3 h-3"/></button>
      </>}
    </div>
  );
};

export default UploadedArtText;
