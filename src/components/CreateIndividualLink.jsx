import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PiLinkBold } from "react-icons/pi";
import CryptoJS from 'crypto-js';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { TbCopy } from 'react-icons/tb';

const CreateIndividualLink = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showPrice, setShowPrice] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const { t } = useTranslation();

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
    setShowPrice(true);
    setShowLinkInput(false);
    setGeneratedLink('');
  };

  const handleCreateLink = () => {
    if (selectedCourse) {
      const prefix = selectedCourse.prefix;
      let baseUrl = process.env.REACT_APP_FORUM_URL;

      if (prefix !== 'F') {
        baseUrl = process.env.REACT_APP_MARKAZ_URL;
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

  const bounceVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 500, damping: 15 } },
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

            {showPrice && selectedCourse && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={bounceVariants}
                className="space-y-2"
              >
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
              </motion.div>
            )}

            {showPrice && !showLinkInput && (
              <button
                onClick={handleCreateLink}
                className="w-full px-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 mt-4"
              >
                {t('create-individual-link')}
              </button>
            )}

            {showLinkInput && selectedCourse && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={bounceVariants}
                className="mt-4 space-y-2"
              >
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
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={copied ? { rotate: 360 } : { rotate: 0 }}
                      transition={{ duration: 0.15, ease: "easeInOut" }}
                    >
                      {copied ? (
                        <FiCheck className="w-6 h-6 text-green-500" />
                      ) : (
                        <TbCopy className="w-6 h-6 text-gray-700" />
                      )}
                    </motion.div>
                  </button>
                </div>
              </motion.div>
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
