import { AltSceneNode } from "../../altNodes/altMixins";
import { commonPosition } from "../../common/commonPosition";

export const tailwindPosition = (
  node: AltSceneNode,
  parentId: string
): string => {
  // don't add position to the first (highest) node in the tree
  if (!node.parent || parentId === node.parent.id) {
    return "";
  }

  // Group
  if (node.parent.isRelative === true) {
    // position is absolute, needs to be relative
    return retrieveAbsolutePos(node);
  }

  // Frame, Instance, Component
  if ("layoutMode" in node.parent && node.parent.layoutMode !== "NONE") {
    if (node.layoutAlign === "MAX") {
      return "self-end ";
    } else if (node.layoutAlign === "MIN") {
      return "self-start ";
    }
    // STRETCH or CENTER are already centered by the parent
  }

  return "";
};

const retrieveAbsolutePos = (node: AltSceneNode): string => {
  // todoEverything with Center was commented, because mx-auto requires a width, and my-auto requires a height, but it is uncertain if the nodes have it. Should it verify, or can we live this way?
  switch (commonPosition(node)) {
    case "":
      return "";
    case "Absolute":
      return "absoluteManualLayout";
    case "TopStart":
      return "absolute left-0 top-0 ";
    case "TopCenter":
      return "absoluteManualLayout";
    // return "absolute inset-x-0 top-0 mx-auto ";
    case "TopEnd":
      return "absolute right-0 top-0 ";
    case "CenterStart":
      return "absoluteManualLayout";
    // return "absolute inset-y-0 left-0 my-auto ";
    case "Center":
      return "absoluteManualLayout";
    // return "absolute m-auto inset-0 ";
    case "CenterEnd":
      return "absoluteManualLayout";
    // return "absolute inset-y-0 right-0 my-auto ";
    case "BottomStart":
      return "absolute left-0 bottom-0 ";
    case "BottomCenter":
      return "absoluteManualLayout";
    // return "absolute inset-x-0 bottom-0 mx-auto ";
    case "BottomEnd":
      return "absolute right-0 bottom-0 ";
  }
};
