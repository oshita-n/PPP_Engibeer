import { useRouter } from "next/dist/client/router";
import { useCallback, useEffect, useState, VFC } from "react";
import BroadcastTitle from "../../../../components/BroadcastTitle";
import Button from "../../../../components/Button";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from 'firebase/firestore/lite';

type BroadcastInfo = {
  id: string;
  title: string;
  status: "before" | "during" | "after";
  engibeerCount: string;
  date: string;
};

const EngiberrAddPage: VFC = () => {
  const [broadcastInfo, setBroadcastInfo] = useState<BroadcastInfo>();
  const [engibeer, setEngibeer] = useState("");

  const router = useRouter();

  const fetchLiveInfo = useCallback(
    async (broadcastId: string | string[] | undefined) => {
      const res = await fetch(
        `http://localhost:3001/broadcasts/${broadcastId}`
      );
      const json = await res.json();
      setBroadcastInfo(json);
    },
    []
  );

  const saveEngibeer = useCallback(async() => {
    const firebaseConfig = {};
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // useContextを使用して、uidを取得する
    const userID = "";
    // 保存されているbroadcastIdを取得する
    const broadcastId = "";
    
    await addDoc(collection(db, `broadcast/${broadcastId}/engibeer`), {
      userID:userID,
      title:engibeer,
      status:"フューチャー前",
    });
  }, [engibeer]);

  useEffect(() => {
    // クエリがセットされたことを検知
    if (router.asPath !== router.route) {
      const { broadcastId } = router.query;
      fetchLiveInfo(broadcastId);
    }
  }, [router]);

  return (
    <div className="flex flex-col justify-center items-center">
      {broadcastInfo !== undefined ? (
        <div className="pt-10 mb-8">
          <BroadcastTitle
            title={broadcastInfo.title}
            status={broadcastInfo.status}
          />
        </div>
      ) : null}

      <textarea
        className="w-2/4 h-24 px-3.5 py-3 text-2xl mb-8 font-bold"
        cols={30}
        rows={10}
        placeholder="エンジビアを入力する"
        onChange={(e) => setEngibeer(e.target.value)}
      ></textarea>

      <Button text="保存する" onClick={saveEngibeer} />
    </div>
  );
};

export default EngiberrAddPage;
