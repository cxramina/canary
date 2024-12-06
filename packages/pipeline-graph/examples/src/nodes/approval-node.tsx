import { transform } from "typescript";
import { LeafNodeInternalType } from "../../types/nodes-internal";

export interface ApprovalNodeDataType {}

export function ApprovalNode(props: {
  node: LeafNodeInternalType<ApprovalNodeDataType>;
}) {
  const style: React.CSSProperties = {
    transformOrigin: "center center",
    zIndex: "-10",
    position: "absolute",
    transform: "rotate(45deg)",
    boxSizing: "border-box",
    left: "15%",
    top: "15%",
    height: "70%",
    width: "70%",
    border: "1px solid #454545",
    // borderRadius: "50%",
    background:
      "linear-gradient(-47deg, rgba(152, 150, 172, 0.05) 0%, rgba(177, 177, 177, 0.15) 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <div style={style}></div>
      <div>APPROVAL</div>
    </div>
  );
}
