import React from "react";
import { useRouter } from "next/router";

const Preview = () => {
  const router = useRouter();
  const { reporturl } = router.query;

  return (
    <div className="bg-slate-100 max-h-screen">
      {reporturl && <iframe className="w-full h-screen" src={`${reporturl}`} />}
    </div>
  );
};

export default Preview;
