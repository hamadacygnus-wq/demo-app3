"use client";

import {
  Search,
  Bell,
  User,
  LayoutGrid,
  Save,
  X,
  FileText,
  ChevronRight,
  Home,
} from "lucide-react";
import { useState } from "react";

// 登録された顧客データの型
type Customer = {
  id: number;
  company: string;
  name: string;
  phone: string;
  status: string;
};

export function CrmScreen() {
  // フォームの入力状態
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("未対応");

  // 初期のダミーデータリストを完全に空（クリア）にしました！
  const [customers, setCustomers] = useState<Customer[]>([]);

  // 保存ボタンを押したときの処理（RPAにここをクリックさせます）
  const handleSave = () => {
    if (!company) return; // 会社名が空なら何もしない
    
    const newCustomer = {
      // 最初が0件でも、1001番から綺麗に自動採番がスタートします
      id: customers.length > 0 ? customers[0].id + 1 : 1001,
      company,
      name,
      phone,
      status,
    };
    
    // リストの先頭に新しいデータを追加
    setCustomers([newCustomer, ...customers]);
    
    // 入力フォームを空に戻す（次のデータ入力のため）
    setCompany("");
    setName("");
    setPhone("");
    setStatus("未対応");
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] font-sans text-[#333333]">
      {/* グローバルポータルヘッダー（黒・紺系） */}
      <header className="bg-[#344054] text-white h-12 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <LayoutGrid className="h-5 w-5" />
          <span className="font-bold text-sm tracking-widest">ポータル</span>
        </div>
        <div className="flex items-center gap-5">
          <Search className="h-5 w-5 text-slate-300" />
          <Bell className="h-5 w-5 text-slate-300" />
          <div className="flex items-center gap-2">
            <div className="bg-slate-500 rounded-full p-1"><User className="h-4 w-4" /></div>
            <span className="text-xs font-bold">デモユーザー</span>
          </div>
        </div>
      </header>

      {/* アプリヘッダー（白背景） */}
      <div className="bg-white border-b border-slate-300 shadow-sm px-6 py-3 flex items-center gap-3">
        <div className="bg-blue-500 p-2 rounded-md">
          <FileText className="h-6 w-6 text-white" />
        </div>
        <div>
          <div className="flex items-center text-xs text-slate-500 mb-0.5 gap-1">
            <Home className="h-3 w-3" /> <ChevronRight className="h-3 w-3" /> 営業部スペース <ChevronRight className="h-3 w-3" />
          </div>
          <h1 className="text-xl font-bold text-slate-800">【デモ】顧客管理アプリ</h1>
        </div>
      </div>

      {/* メインコンテンツエリア */}
      <main className="max-w-7xl mx-auto p-6 grid grid-cols-12 gap-6">
        
        {/* 左側：レコード追加フォーム（RPAが入力する場所） */}
        <div className="col-span-12 lg:col-span-4 bg-white border border-slate-300 shadow-sm">
          <div className="bg-[#f8f9fa] border-b border-slate-300 px-4 py-3 flex items-center justify-between">
            <h2 className="font-bold text-slate-700">新規レコード追加</h2>
          </div>
          
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">会社名 <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full border border-slate-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">担当者名</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-slate-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">電話番号</label>
              <input 
                type="text" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-slate-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-600 mb-1">ステータス</label>
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-slate-300 rounded px-3 py-2 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition bg-white"
              >
                <option value="未対応">未対応</option>
                <option value="アプローチ中">アプローチ中</option>
                <option value="商談中">商談中</option>
                <option value="受注">受注</option>
                <option value="失注">失注</option>
              </select>
            </div>
          </div>
          
          <div className="bg-[#f8f9fa] border-t border-slate-300 px-4 py-3 flex gap-3">
            <button 
              onClick={handleSave}
              className="bg-[#3498db] hover:bg-[#2980b9] text-white font-bold py-2 px-6 rounded shadow-sm transition flex items-center gap-2"
            >
              <Save className="h-4 w-4" /> 保存
            </button>
            <button className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-600 font-bold py-2 px-4 rounded shadow-sm transition flex items-center gap-2">
              <X className="h-4 w-4" /> キャンセル
            </button>
          </div>
        </div>

        {/* 右側：登録済みレコード一覧 */}
        <div className="col-span-12 lg:col-span-8 bg-white border border-slate-300 shadow-sm">
           <div className="bg-[#f8f9fa] border-b border-slate-300 px-4 py-3">
            <h2 className="font-bold text-slate-700">最近登録された顧客一覧</h2>
          </div>
          
          <div className="p-4 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#f5f5f5] text-slate-600 border-y border-slate-300">
                  <th className="py-2 px-3 text-left font-bold border-r border-slate-300 w-16">ID</th>
                  <th className="py-2 px-3 text-left font-bold border-r border-slate-300">会社名</th>
                  <th className="py-2 px-3 text-left font-bold border-r border-slate-300">担当者</th>
                  <th className="py-2 px-3 text-left font-bold border-r border-slate-300">電話番号</th>
                  <th className="py-2 px-3 text-left font-bold w-28">ステータス</th>
                </tr>
              </thead>
              <tbody>
                {/* 0件のときは「データがありません」という案内を出し、見栄えを整えます */}
                {customers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-slate-400 font-medium bg-slate-50/50 italic">
                      登録された顧客データはありません。
                    </td>
                  </tr>
                ) : (
                  customers.map((c) => (
                    <tr key={c.id} className="border-b border-slate-200 hover:bg-blue-50 transition-colors">
                      <td className="py-2.5 px-3 border-r border-slate-200 text-slate-500">{c.id}</td>
                      <td className="py-2.5 px-3 border-r border-slate-200 font-bold text-[#3498db] cursor-pointer hover:underline">{c.company}</td>
                      <td className="py-2.5 px-3 border-r border-slate-200">{c.name}</td>
                      <td className="py-2.5 px-3 border-r border-slate-200">{c.phone}</td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-1 text-xs font-bold rounded ${
                          c.status === '未対応' ? 'bg-slate-100 text-slate-600' :
                          c.status === 'アプローチ中' ? 'bg-blue-100 text-blue-700' :
                          c.status === '受注' ? 'bg-green-100 text-green-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        
      </main>
    </div>
  );
}