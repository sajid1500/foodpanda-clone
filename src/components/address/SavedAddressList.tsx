import {
  LuCheck,
  LuChrome,
  LuMapPin,
  LuPencil,
  LuPlus,
  LuTrash2,
} from "react-icons/lu";
const addresses = [
  {
    id: 1,
    title: "Home",
    subtitle: "7 Dhaka",
    icon: "home",
    isDefault: true,
  },
  {
    id: 2,
    title: "7",
    subtitle: "Dhaka",
    icon: "pin",
    isDefault: false,
  },
  {
    id: 3,
    title: "Butex",
    subtitle: "Dhaka",
    icon: "pin",
    isDefault: false,
  },
  {
    id: 4,
    title: "Shaheed Tajuddin Ahmed Saroni",
    subtitle: "Dhaka",
    icon: "pin",
    isDefault: false,
  },
  {
    id: 5,
    title: "Shaheed Tajuddin Ahmed Saroni",
    subtitle: "Dhaka",
    icon: "pin",
    isDefault: false,
  },
  {
    id: 6,
    title: "Shaheed Tajuddin Ahmed Saroni",
    subtitle: "Dhaka",
    icon: "pin",
    isDefault: false,
  },

  {
    id: 7,
    title: "Shaheed Tajuddin Ahmed Saroni",
    subtitle: "Dhaka",
    icon: "pin",
    isDefault: false,
  },
  {
    id: 8,
    title: "Shaheed Tajuddin Ahmed Saroni",
    subtitle: "Dhaka",
    icon: "pin",
    isDefault: false,
  },
];
function SavedAddressList() {
  return (
    <div className="max-h-[280px] divide-y divide-neutral-100 overflow-y-auto">
      {addresses.map((address) => (
        <div
          key={address.id}
          className="flex items-start justify-between gap-3 py-3"
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600">
              {address.icon === "home" ? (
                <LuChrome size={16} />
              ) : (
                <LuMapPin size={16} />
              )}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-neutral-900">
                  {address.title}
                </p>
                {address.isDefault && (
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-neutral-200 text-neutral-700">
                    <LuCheck size={12} />
                  </span>
                )}
              </div>
              {address.subtitle && (
                <p className="text-xs text-neutral-500">{address.subtitle}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Edit address"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-700"
            >
              <LuPencil size={16} />
            </button>
            <button
              type="button"
              aria-label="Delete address"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-700"
            >
              <LuTrash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export { SavedAddressList };
