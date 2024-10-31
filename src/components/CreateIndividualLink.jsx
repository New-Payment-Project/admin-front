import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PiLinkBold } from "react-icons/pi";
import CryptoJS from 'crypto-js';

const CreateIndividualLink = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const { t } = useTranslation();

  // Function to decrypt the token
  const decryptToken = () => {
    const secretKey = process.env.REACT_APP_SECRET_KEY || 'your-secret-key';
    const encryptedToken = localStorage.getItem('token');
    const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = decryptToken();
        const response = await fetch(`${process.env.REACT_APP_API_URL}/courses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseChange = (event) => {
    const courseId = event.target.value;
    const course = courses.find((c) => c._id === courseId);
    setSelectedCourse(course);
    setShowLinkInput(false); 
    setGeneratedLink(''); 
  };

  const handleCreateLink = () => {
    if (selectedCourse) {
      const prefix = selectedCourse.prefix;
      let baseUrl = 'https://markaz.norbekovgroup.uz/';

      if (prefix === 'F') {
        baseUrl = 'https://forum.norbekovgroup.uz/';
      }

      setGeneratedLink(`${baseUrl}${selectedCourse.route}`);
      setShowLinkInput(true); 
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className="w-full py-6 space-y-6 justify-end flex">
      <button
        className="btn text-white bg-bank-gradient"
        onClick={() => document.getElementById('my_modal_1').showModal()}
      >
        <PiLinkBold />
        {t('create-link')}
      </button>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{t('select-course')}</h3>

          <div className="space-y-4 py-4">
            <label htmlFor="courseSelect" className="block text-sm font-medium text-gray-700">
              {t('select-course')} ({courses.length} {t('courses-available')}):
            </label>
            <div className="relative">
              <select
                id="courseSelect"
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={handleCourseChange}
                defaultValue=""
              >
                <option value="" disabled>
                  {t('choose-course')}
                </option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.title}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>

            {selectedCourse && (
              <div className="space-y-2">
                <label htmlFor="coursePrice" className="block text-sm font-medium text-gray-700">
                  {t('course-price')}:
                </label>
                <input
                  type="text"
                  id="coursePrice"
                  className="block w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={`${selectedCourse.price} so'm`}
                  readOnly
                />
              </div>
            )}

            {!showLinkInput && (
              <button
                onClick={handleCreateLink}
                className="w-full px-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
              >
                {t('create-individual-link')}
              </button>
            )}

            {showLinkInput && selectedCourse && (
              <div className="mt-4 space-y-2">
                <label htmlFor="courseLinkInput" className="block text-sm font-medium text-gray-700">
                  {t('generated-link')}:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="courseLinkInput"
                    className="block w-full px-4 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={generatedLink}
                    readOnly
                  />
                  <button
                    onClick={handleCopyLink}
                    className="absolute inset-y-0 right-0 px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-r-lg focus:outline-none"
                  >
                    {copied ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="green"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 7.5V6.75A2.25 2.25 0 0014.25 4.5h-7.5A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25V16.5m-6-7.5h7.5M9 12h7.5M6 16.5h7.5"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">{t('close')}</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CreateIndividualLink;
