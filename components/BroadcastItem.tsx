import { useRouter } from "next/dist/client/router";
import { useCallback, VFC } from "react";
import BroadcastStatus from "./BroadcastStatus";

type Props = {
  broadcastId: string;
  title: string;
  status: "before" | "during" | "after";
  engibeerCount: number;
  date: string;
};

const BroadcastItem: VFC<Props> = (props) => {
  const { broadcastId, title, status, engibeerCount, date } = props;
  const router = useRouter();
  const routerPush = useCallback(
    (broadcastId: string, status: "before" | "during" | "after"): void => {
      if (status === "before") {
        // 放送前の場合 エンジビア投稿画面に遷移
        router.push(`before/${broadcastId}/engibeer/add`);
      } else if (status === "during") {
        // 放送中の場合 放送中のページに遷移
        router.push(`/live/${broadcastId}`);
      } else {
        // 放送済みの場合　アーカイブのページに遷移
        router.push(`/archive/${broadcastId}`);
      }
    },
    []
  );
  return (
    <div
      className="text-sm px-6 py-4 h-20 bg-white border-b cursor-pointer"
      onClick={() => routerPush(broadcastId, status)}
    >
      <div className="flex justify-between mb-2">
        <h4 className="text-light_blue_600"> {title}</h4>
        <div className="">
          <BroadcastStatus status={status} />
        </div>
      </div>
      <div className="flex justify-between text-gray-500">
        <div>{date}</div>
        <div className="">エンジビア数{engibeerCount}</div>
      </div>
    </div>
  );
};

export default BroadcastItem;
