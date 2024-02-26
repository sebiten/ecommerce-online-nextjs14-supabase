"use client";
import React, { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadImage } from "../login/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { unstable_noStore } from "next/cache";
import Image from "next/image";
import Spinner from "./Spinner";

const Avatar = ({ data }: { data: any }) => {
  unstable_noStore();
  const [isLoading, setisLoading] = useState("");
  const userId = data?.user?.id;

  return (
    <div>
      <form className="mb-8 flex flex-col items-center justify-center gap-4">
        <Suspense fallback={<Skeleton />}>
          <Input
            placeholder="Upload a photo"
            type="file"
            name="file"
            id="file"
          />
          <Button formAction={uploadImage} type="submit" className="mt-2">
            Submit photo
          </Button>
          <Image
            width={300}
            height={300}
            src={`https://aaxuhmukpnvrngnsqoym.supabase.co/storage/v1/object/public/profile/user/${userId}?${Date.now()}`}
            alt="user-avatar"
          />
        </Suspense>
      </form>
    </div>
  );
};

export default Avatar;
