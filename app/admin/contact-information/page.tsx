"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"
import { Save, Plus, Trash2, AlertCircle, CheckCircle, X, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface ContactInformation {
  _id?: string;
  address: string;
  phones: string[];
  email: string;
  workingHours: {
    sundayToFriday: string;
    saturday: string;
  };
}

interface ToastProps {
  message: string
  type: "success" | "error"
  onClose: () => void
}

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-md shadow-lg p-4 ${
        type === "success"
          ? "bg-green-50 text-green-700 border border-green-200"
          : "bg-red-50 text-red-700 border border-red-200"
      }`}
    >
      {type === "success" ? (
        <CheckCircle className="h-5 w-5 flex-shrink-0" />
      ) : (
        <AlertCircle className="h-5 w-5 flex-shrink-0" />
      )}
      <p className="text-sm font-medium">{message}</p>
      <button onClick={onClose} className="ml-2 rounded-full p-1 hover:bg-black hover:bg-opacity-10 transition-colors">
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  )
}

export default function ContactInformationPage() {
  const [contactInfo, setContactInfo] = useState<ContactInformation>({
    address: "",
    phones: [""],
    email: "",
    workingHours: {
      sundayToFriday: "",
      saturday: "",
    },
  })

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  const showSuccessToast = (message: string) => {
    setToast({ message, type: "success" })
  }

  const showErrorToast = (message: string) => {
    setToast({ message, type: "error" })
  }

  const closeToast = () => {
    setToast(null)
  }

 const fetchContactInformation = async () => {
  setIsLoading(true)
  setError(null)

  try {
    const response = await axios.get("/api/admin/contact-information")
    console.log("Fetched contact information:", response.data)
    
    if (response.data.success && response.data.data && response.data.data.length > 0) {
      const apiData = response.data.data[0]
      setContactInfo({
        _id: apiData._id,
        address: apiData.address || "",
        phones: apiData.phone || [""],  // Changed from phones to phone
        email: apiData.email || "",
        workingHours: {
          sundayToFriday: apiData.workingHours?.sundayToFriday || "",
          saturday: apiData.workingHours?.saturday || "",
        },
      })
    }
  } catch (err) {
    console.error("Error fetching contact information:", err)
    setError("Failed to load contact information. Please try again.")
  } finally {
    setIsLoading(false)
  }
}

const saveContactInformation = async () => {
  setIsSaving(true);
  setError(null);

  try {
    const dataToSend = {
      address: contactInfo.address,
      phone: contactInfo.phones,  // Changed from phones to phone
      email: contactInfo.email,
      workingHours: contactInfo.workingHours,
    };

    let response;

    if (contactInfo._id) {
      response = await axios.patch("/api/admin/contact-information", {
        id: contactInfo._id,
        ...dataToSend,
      });
    } else {
      response = await axios.post("/api/contact-information", dataToSend);
    }

    showSuccessToast("Contact information saved successfully");
    fetchContactInformation();
  } catch (err) {
    console.error("Error saving contact information:", err);
    showErrorToast("Failed to save contact information. Please try again.");
  } finally {
    setIsSaving(false);
  }
};
  const deleteContactInformation = async () => {
    if (!contactInfo._id) return;

    setIsDeleting(true);
    setError(null);

    try {
      await axios.delete(`/api/admin/contact-information?id=${contactInfo._id}`);
      showSuccessToast("Contact information deleted successfully");
      setContactInfo({
        address: "",
        phones: [""],
        email: "",
        workingHours: {
          sundayToFriday: "",
          saturday: "",
        },
      });
    } catch (err) {
      console.error("Error deleting contact information:", err);
      showErrorToast("Failed to delete contact information. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleInputChange = (field: keyof ContactInformation, value: string) => {
    setContactInfo((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePhoneChange = (index: number, value: string) => {
    const updatedPhones = [...contactInfo.phones]
    updatedPhones[index] = value
    setContactInfo((prev) => ({
      ...prev,
      phones: updatedPhones,
    }))
  }

  const handleWorkingHoursChange = (field: keyof typeof contactInfo.workingHours, value: string) => {
    setContactInfo((prev) => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [field]: value,
      },
    }))
  }

  const addPhoneNumber = () => {
    if (contactInfo.phones.length < 2) {
      setContactInfo((prev) => ({
        ...prev,
        phones: [...prev.phones, ""],
      }))
    }
  }

//   const removePhoneNumber = (index: number) => {
//     const updatedPhones = [...contactInfo.phones]
//     updatedPhones.splice(index, 1)
//     setContactInfo((prev) => ({
//       ...prev,
//       phones: updatedPhones,
//     }))
//   }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    saveContactInformation()
  }

  useEffect(() => {
    fetchContactInformation()
  }, [])

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.3 }}
       className="flex flex-1 flex-col"
      >
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>
              Manage your organization's contact details that will be displayed on the website
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-16 bg-slate-100 animate-pulse rounded-md" />
                ))}
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={contactInfo.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Enter your organization's address"
                      required
                    />
                  </div>

              <div className="space-y-2">
  <div className="flex justify-between items-center">
    <Label>Phone Numbers</Label>
    {contactInfo.phones.length < 2 && (
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addPhoneNumber}
        className="h-8"
      >
        <Plus className="h-3.5 w-3.5 mr-1" />
        Add Phone
      </Button>
    )}
  </div>
  <div className="space-y-3">
    {contactInfo.phones.map((phone, index) => (
      <div key={index} className="flex gap-2">
        <Input
          value={phone}
          onChange={(e) => handlePhoneChange(index, e.target.value)}
          placeholder={`Phone number ${index + 1}`}
          required
        />
      </div>
    ))}
  </div>
</div>


                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter your organization's email"
                      required
                    />
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-base font-medium mb-4">Working Hours</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="sundayToFriday">Sunday to Friday</Label>
                        <Input
                          id="sundayToFriday"
                          value={contactInfo.workingHours.sundayToFriday}
                          onChange={(e) => handleWorkingHoursChange("sundayToFriday", e.target.value)}
                          placeholder="e.g. 7:00 AM - 8:00 PM"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="saturday">Saturday</Label>
                        <Input
                          id="saturday"
                          value={contactInfo.workingHours.saturday}
                          onChange={(e) => handleWorkingHoursChange("saturday", e.target.value)}
                          placeholder="e.g. Closed or 9:00 AM - 2:00 PM"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {contactInfo._id && (
              <Button 
                type="button" 
                variant="destructive" 
                onClick={deleteContactInformation}
                disabled={isDeleting}
                className="w-full sm:w-auto"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </>
                )}
              </Button>
            )}
            <Button 
              onClick={handleSubmit} 
              disabled={isLoading || isSaving} 
              className="w-full sm:w-auto ml-auto"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        {!isLoading && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Current Contact Information</CardTitle>
              <CardDescription>This is how your contact information appears on the website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-slate-500 mb-1">Address</h3>
                  <p className="text-slate-900">{contactInfo.address || "Not set"}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-slate-500 mb-1">Phone Numbers</h3>
                  {contactInfo.phones.length > 0 ? (
                    <ul className="space-y-1">
                      {contactInfo.phones.map((phone, index) => (
                        <li key={index} className="text-slate-900">
                          {phone}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-slate-900">No phone numbers set</p>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-medium text-slate-500 mb-1">Email</h3>
                  <p className="text-slate-900">{contactInfo.email || "Not set"}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-slate-500 mb-1">Working Hours</h3>
                  <div className="space-y-1">
                    <div className="flex">
                      <span className="text-slate-700 font-medium w-32">Sunday to Friday:</span>
                      <span className="text-slate-900">{contactInfo.workingHours.sundayToFriday || "Not set"}</span>
                    </div>
                    <div className="flex">
                      <span className="text-slate-700 font-medium w-32">Saturday:</span>
                      <span className="text-slate-900">{contactInfo.workingHours.saturday || "Not set"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>

      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
      </AnimatePresence>
    </>
  )
}