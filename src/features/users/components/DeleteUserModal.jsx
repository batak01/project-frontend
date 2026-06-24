"use client";

export default function DeleteUserModal({

open,

user,

onClose,

onConfirm

}){


if(!open){
  return null;
}


return (

<div
className="
fixed
inset-0
bg-black/40
flex
items-center
justify-center
z-50
"
>


<div
className="
bg-white
rounded-2xl
p-6
w-full
max-w-md
shadow-xl
"
>


<h2
className="
text-xl
font-bold
text-slate-800
"
>
Delete User
</h2>


<p
className="
mt-3
text-gray-500
"
>
Are you sure you want to delete this user?
</p>


<div
className="
mt-4
bg-slate-100
rounded-xl
p-4
border
border-slate-200
"
>

<p
className="
text-sm
text-slate-500
mb-1
"
>
User Email
</p>


<p
className="
text-slate-800
"
>
{user?.email}
</p>


</div>


<div
className="
flex
justify-end
gap-3
mt-8
"
>

<button

onClick={onClose}

className="
px-5
py-2
rounded-lg
border
border-slate-300
text-slate-700
font-medium
hover:bg-slate-100
transition
"

>
Cancel
</button>


<button

onClick={onConfirm}

className="
px-5
py-2
rounded-lg
bg-red-500
text-white
font-medium
hover:bg-red-600
transition
"

>
Delete
</button>


</div>


</div>


</div>

);


}