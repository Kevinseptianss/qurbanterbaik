"use client";
import Image from "next/image";
import { Location, Whatsapp, Share } from "iconsax-react";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import YouTube from "react-youtube";

export default function Detail() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/getDetail?id=${params.id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleShare = () => {
    // Get the current URL
    const shareUrl = window.location.href;
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        setIsCopied(true);
        // Reset the copied state after 3 seconds
        setTimeout(() => setIsCopied(false), 3000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        // Fallback for browsers that don't support clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 3000);
        } catch (err) {
          console.error('Fallback copy failed: ', err);
        }
        document.body.removeChild(textArea);
      });
  };

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
      controls: 1,
      modestbranding: 1,
      rel: 0,
    },
  };

  const extractYouTubeId = (url) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center h-[calc(100vh-150px)]">
          <p>Memuat...</p>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center h-[calc(100vh-150px)]">
          <p>Tidak di temukan data</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="flex flex-col gap-4 px-4 py-2 overflow-y-auto h-[calc(100vh-150px)]">
        <Image
          src={product.linkFoto}
          alt={product.judul}
          className="w-full h-auto object-contain"
          width={150}
          height={150}
        />
          <div className="w-full aspect-video rounded-lg">
            <YouTube
              videoId={extractYouTubeId(product.linkYoutube)}
              opts={opts}
              className="w-full h-full"
            />
          </div>
        <h1 className="text-2xl font-bold">{product.judul}</h1>
        <h1 className="text-2xl font-bold text-red-500">
          Rp {product.harga.toLocaleString()}
        </h1>

        <div className="flex flex-row gap-2">
          <div className="border-1 border-green-200 bg-green-200 rounded-lg px-4 py-2">
            <p className="text-green-600">{product.status}</p>
          </div>

          <div className="border-1 border-blue-200 bg-blue-200 rounded-lg px-4 py-2">
            <p className="text-blue-600">{product.jenis}</p>
          </div>
        </div>

        <div className="flex flex-row gap-2">
          <div className="border-1 border-yellow-200 bg-yellow-200 rounded-lg px-4 py-2">
            <p className="text-yellow-600">{product.rangeBobotHarga}</p>
          </div>
        </div>

        <div className="flex flex-row gap-2">
          <div className="flex flex-row gap-2 justify-center items-center border-1 border-orange-200 bg-orange-200 rounded-lg px-4 py-2">
            <Location size="32" color="#f97316" variant="Bulk" />
            <p className="text-orange-500">{product.kandang}</p>
          </div>
        </div>

        <p className="font-bold">Detail Informasi</p>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <p className="font-medium">Jenis Sapi:</p>
            <p>{product.jenis}</p>
          </div>
          <div className="flex flex-row gap-2">
            <p className="font-medium">Kode:</p>
            <p>{product.kode}</p>
          </div>
          <div className="flex flex-row gap-2">
            <p className="font-medium">Bobot:</p>
            <p>{product.bobot || "625 Kg"}</p>
          </div>
          <div className="flex flex-row gap-2">
            <p className="font-medium">Lokasi:</p>
            <p>{product.alamat}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-medium">Deskripsi</p>
            <p className="whitespace-pre-wrap">{product.deskripsi}</p>
          </div>
        </div>

        <button
          onClick={handleShare}
          className="bg-[#8b4513] text-white font-bold rounded-lg px-4 py-2 w-full flex flex-row gap-2 justify-center items-center relative"
        >
          <Share size="32" color="#ffffff" variant="Bulk" />
          <p>{isCopied ? "Tautan Tersalin!" : "Bagikan"}</p>
          {isCopied && (
            <div className="absolute -top-8 bg-gray-800 text-white text-xs px-2 py-1 rounded">
              Tautan berhasil disalin!
            </div>
          )}
        </button>

        <a
          href={`https://wa.me/6281297463380?text=Halo,%20saya%20tertarik%20dengan%20${product.judul}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#8b4513] text-white font-bold rounded-lg px-4 py-2 w-full flex flex-row gap-2 justify-center items-center"
        >
          <Whatsapp size="32" color="#ffffff" variant="Bulk" />
          <p>Hubungi Kami</p>
        </a>
      </div>
    </>
  );
}