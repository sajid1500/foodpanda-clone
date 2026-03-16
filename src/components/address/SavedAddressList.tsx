import { getUserAddresses } from "@/lib/services/userService";
import { useLayoutStore } from "@/lib/stores/layoutStore";
import { useUserStore } from "@/lib/stores/userStore";
import { UserAddress } from "@/lib/types/user.types";
import {
  LuCheck,
  LuChrome,
  LuMapPin,
  LuPencil,
  LuPlus,
  LuTrash2,
} from "react-icons/lu";

function SavedAddressList() {
  const { userAddresses, setSelectedLocation } = useUserStore((state) => state);
  const { setView } = useLayoutStore((store) => store);

  const editAddress = async (address: UserAddress) => {
    setView("AddressForm");
    // await getUserAddresses(); // Ensure we have the latest addresses before editing
    setSelectedLocation(address);
  };

  return (
    <div className="max-h-[280px] divide-y divide-neutral-100 overflow-y-auto">
      {userAddresses.map((address) => (
        <div
          key={address.id}
          className="flex items-start justify-between gap-3 py-3"
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600">
              {address.label === "home" ? (
                <LuChrome size={16} />
              ) : (
                <LuMapPin size={16} />
              )}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-neutral-900">
                  {address.addressLine1}
                </p>
                {address.isDefault && (
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-neutral-200 text-neutral-700">
                    <LuCheck size={12} />
                  </span>
                )}
              </div>
              {address.city && (
                <p className="text-xs text-neutral-500">{address.city}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Edit address"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-700"
            >
              <LuPencil size={16} onClick={() => editAddress(address)} />
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
