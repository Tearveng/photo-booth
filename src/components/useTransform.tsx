"use client";

import Konva from "konva";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Rect, Text, Transformer } from "react-konva";
import { ISticker } from "./KonvaCanvas";

interface IUseTransform {
  stickerRef: RefObject<Map<any, any>>;
  stickers: ISticker[];
  setStickers: Dispatch<SetStateAction<ISticker[]>>;
}

export const useTransform = (props: IUseTransform) => {
  const isSelecting = useRef(false);
  const transformerRef = useRef<any>(null);
  const deleteRef = useRef<any>(null);
  const [selectedIds, setSelectedIds] = useState<any[]>([]);

  const [selectItem, setSelectItem] = useState({
    visible: false,
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  });

  // Click handler for stage
  const handleStageClick = (e: any) => {
    // If we are selecting with rect, do nothing
    if (selectItem.visible) {
      return;
    }
    // If click on empty area - remove all selections
    if (e.target === e.target.getStage()) {
      setSelectedIds([]);
      return;
    }

    // Do nothing if clicked NOT on our rectangles
    if (!e.target.hasName("sticker")) {
      setSelectedIds([]);
      return;
    }

    const clickedId = e.target.id();

    // Do we pressed shift or ctrl?
    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
    const isSelected = selectedIds.includes(clickedId);

    if (!metaPressed && !isSelected) {
      // If no key pressed and the node is not selected
      // select just one
      setSelectedIds([clickedId]);
    } else if (metaPressed && isSelected) {
      // If we pressed keys and node was selected
      // we need to remove it from selection
      setSelectedIds(selectedIds.filter((id) => id !== clickedId));
    } else if (metaPressed && !isSelected) {
      // Add the node into selection
      setSelectedIds([...selectedIds, clickedId]);
    }
  };

  const onTouchStart = (e: any) => {
    const clickedId = e.target.id();

    // Do we pressed shift or ctrl?
    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
    const isSelected = selectedIds.includes(clickedId);

    if (!metaPressed && !isSelected) {
      // If no key pressed and the node is not selected
      // select just one
      setSelectedIds([clickedId]);
    } else if (metaPressed && isSelected) {
      // If we pressed keys and node was selected
      // we need to remove it from selection
      setSelectedIds(selectedIds.filter((id) => id !== clickedId));
    } else if (metaPressed && !isSelected) {
      // Add the node into selection
      setSelectedIds([...selectedIds, clickedId]);
    }
  };

  function getTopRightPosition(node: any): { x: number; y: number } {
    const box = node.getClientRect({ relativeTo: node.getStage()! });
    const rotation = node.rotation();
    const center = {
      x: box.x + box.width / 2,
      y: box.y + box.height / 2,
    };

    const topRight = {
      x: box.x + box.width - 5,
      y: box.y - 7,
    };

    const rad = Konva.getAngle(rotation); // Convert to radians
    const rotated = {
      x:
        Math.cos(rad) * (topRight.x - center.x) -
        Math.sin(rad) * (topRight.y - center.y) +
        center.x,
      y:
        Math.sin(rad) * (topRight.x - center.x) +
        Math.cos(rad) * (topRight.y - center.y) +
        center.y,
    };

    return rotated;
  }

  const handleOnTransform = () => {
    if (selectedIds.length && transformerRef.current) {
      const box = transformerRef.current.getClientRect();
      const topRight = {
        x: box.x + box.width - 9,
        y: box.y + 47,
      };
      deleteRef.current.position(topRight);
    }
  };

  const handleMouseDown = (e: any) => {
    // Do nothing if we mousedown on any shape
    if (e.target !== e.target.getStage()) {
      return;
    }

    // Start selection rectangle
    isSelecting.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setSelectItem({
      visible: true,
      x1: pos.x,
      y1: pos.y,
      x2: pos.x,
      y2: pos.y,
    });
  };

  const handleMouseMove = (e: any) => {
    // Do nothing if we didn't start selection
    if (!isSelecting.current) {
      return;
    }

    const pos = e.target.getStage().getPointerPosition();
    setSelectItem({
      ...selectItem,
      x2: pos.x,
      y2: pos.y,
    });
  };

  const handleMouseUp = () => {
    // Do nothing if we didn't start selection
    if (!isSelecting.current) {
      return;
    }
    isSelecting.current = false;

    // Update visibility in timeout, so we can check it in click event
    setTimeout(() => {
      setSelectItem({
        ...selectItem,
        visible: false,
      });
    });

    const selBox = {
      x: Math.min(selectItem.x1, selectItem.x2),
      y: Math.min(selectItem.y1, selectItem.y2),
      width: Math.abs(selectItem.x2 - selectItem.x1),
      height: Math.abs(selectItem.y2 - selectItem.y1),
    };

    const selected = props.stickers.filter((rect) => {
      // Check if rectangle intersects with selection box
      return Konva.Util.haveIntersection(selBox, {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      });
    });

    setSelectedIds(selected.map((rect: any) => rect.id));
  };

  const handleDragMove = (e: any) => {
    if (selectedIds.length && transformerRef.current) {
      const box = transformerRef.current.getClientRect();
      const topRight = {
        x: box.x + box.width - 9,
        y: box.y + 47,
      };
      deleteRef.current.position(topRight);
    }
  };

  const handleTransformEnd = (e: any) => {
    // Find which rectangle(s) were transformed
    const nodes = transformerRef.current.nodes();

    const newRects = [...props.stickers];

    // Update each transformed node
    nodes.forEach((node: any) => {
      const id = node.id();
      const index = newRects.findIndex((r) => r.id === id);

      if (index !== -1) {
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();

        // Reset scale
        node.scaleX(1);
        node.scaleY(1);

        // Update the state with new values
        newRects[index] = {
          ...newRects[index],
          x: node.x(),
          y: node.y(),
          width: Math.max(5, node.width() * scaleX),
          height: Math.max(node.height() * scaleY),
        };
      }
    });

    props.setStickers(newRects);
    setSelectedIds([]);
    // if (transformerRef.current) {
    //   const node = transformerRef.current.nodes()[0];
    //   const box = node.getClientRect();

    //   deleteRef.current.position({
    //     x: box.x + box.width,
    //     y: box.y,
    //   });
    // }
  };

  const handleDelete = () => {
    if (!selectedIds.length) return;

    selectedIds.forEach((id) => {
      const node = props.stickerRef.current.get(id);
      if (node) {
        node.destroy(); // remove from canvas
        props.stickerRef.current.delete(id); // remove from ref map
      }
    });

    transformerRef.current?.nodes([]);
    setSelectedIds([]); // clear selection
    // layerRef.current?.batchDraw(); // optional
  };

  // Update transformer when selection changes
  useEffect(() => {
    if (selectedIds.length && transformerRef.current) {
      // Get the nodes from the refs Map
      const nodes = selectedIds
        .map((id) => props.stickerRef.current.get(id))
        .filter((node) => node);

      if (deleteRef.current) {
        transformerRef.current.nodes([...nodes]);
        const box = transformerRef.current.getClientRect();
        const topRight = {
          x: box.x + box.width - 9,
          y: box.y + 47,
        };
        deleteRef.current.position(topRight);
      } else {
        transformerRef.current.nodes(nodes);
      }
    } else if (transformerRef.current) {
      // Clear selection
      transformerRef.current.nodes([]);
    }
  }, [selectedIds]);

  const transFormElement = () => {
    // Single transformer for all selected shapes
    return (
      <>
        <Transformer
          ref={transformerRef}
          //   enabledAnchors={["top-left", "bottom-right"]}
          boundBoxFunc={(oldBox, newBox) => {
            // Limit resize
            if (newBox.width < 2 || newBox.height < 2) {
              return oldBox;
            }
            return newBox;
          }}
          onTransform={(e) => {
            const node = e.target;
            // Update delete button position
            if (deleteRef.current) {
              const topRight = getTopRightPosition(node);
              deleteRef.current.position(topRight);
              deleteRef.current.getLayer()?.batchDraw();
            }
          }}
          onTransformEnd={handleTransformEnd}
        />
        {selectedIds.length > 0 && (
          <Text
            ref={deleteRef}
            text="x"
            fontSize={16}
            x={transformerRef.current.findOne(".top-right").position().x}
            fill="red"
            onTouchStart={handleDelete}
            onClick={handleDelete}
          />
        )}
      </>
    );
  };

  const mobileElement = () => {
    return (
      selectItem.visible && (
        <Rect
          x={Math.min(selectItem.x1, selectItem.x2)}
          y={Math.min(selectItem.y1, selectItem.y2)}
          width={Math.abs(selectItem.x2 - selectItem.x1)}
          height={Math.abs(selectItem.y2 - selectItem.y1)}
          fill="rgba(0,0,255,0.5)"
        />
      )
    );
  };

  return {
    mobileElement,
    transFormElement,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleStageClick,
    handleDragMove,
    onTouchStart,
  };
};
