import React from 'react';
import { useForm } from 'react-hook-form';
import { Calendar, Clock, Users, Award } from 'lucide-react';

const Training = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
  // 1. Store in localStorage
  const stored = localStorage.getItem('trainingData');
  const existingData = stored ? JSON.parse(stored) : [];
  const newEntry = {
    ...data,
    id: Date.now(),
    dateSubmitted: new Date().toISOString().split('T')[0]
  };

  const updatedData = [...existingData, newEntry];
  localStorage.setItem('trainingData', JSON.stringify(updatedData));

  // 2. Compose WhatsApp message
  const message = `Hi Crystal! I'd like to schedule a training session.

Training Request Details:
- Name: ${data.name}
- Email: ${data.email}
- Phone: ${data.phone}
- Training Type: ${data.trainingType}
- Skill Level: ${data.skillLevel}
- Preferred Date: ${data.preferredDate}
- Preferred Time: ${data.preferredTime}
- Message: ${data.message || 'No additional message'}

Please let me know your availability. Thank you!`;

    const whatsappUrl = `https://wa.me/2349039299059?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    reset();
  };

  const trainingPrograms = [
    {
      icon: Users,
      title: 'Beginner Sewing Basics',
      duration: '4 weeks',
      description: 'Learn fundamental sewing techniques, machine operation, and basic garment construction.'
    },
    {
      icon: Award,
      title: 'Advanced Pattern Making',
      duration: '6 weeks',
      description: 'Master the art of creating custom patterns and advanced fitting techniques.'
    },
    {
      icon: Clock,
      title: 'Fashion Design Intensive',
      duration: '8 weeks',
      description: 'Comprehensive program covering design principles, fabric selection, and collection development.'
    },
    {
      icon: Calendar,
      title: 'Alterations & Tailoring',
      duration: '3 weeks',
      description: 'Perfect garment fitting and professional alteration techniques.'
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Learn to
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {' '}Create
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Master the art of sewing and fashion design with our comprehensive training programs. From beginner basics to advanced techniques.
          </p>
        </div>
      </section>

      {/* Training Programs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Training Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our carefully structured programs designed to take you from beginner to expert
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {trainingPrograms.map((program, index) => (
              <div key={index} className="p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <program.icon className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{program.title}</h3>
                <div className="text-purple-600 font-semibold mb-4">{program.duration}</div>
                <p className="text-gray-600 leading-relaxed">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Form */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Schedule Your Training
            </h2>
            <p className="text-xl text-gray-600">
              Fill out the form below and we'll get back to you with available slots
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  {...register('phone', { required: 'Phone number is required' })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your phone number"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Training Type *
                </label>
                <select
                  {...register('trainingType', { required: 'Please select a training type' })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select training type</option>
                  <option value="Beginner Sewing Basics">Beginner Sewing Basics</option>
                  <option value="Advanced Pattern Making">Advanced Pattern Making</option>
                  <option value="Fashion Design Intensive">Fashion Design Intensive</option>
                  <option value="Alterations & Tailoring">Alterations & Tailoring</option>
                </select>
                {errors.trainingType && <p className="text-red-500 text-sm mt-1">{errors.trainingType.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Skill Level *
                </label>
                <select
                  {...register('skillLevel', { required: 'Please select your skill level' })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select skill level</option>
                  <option value="Complete Beginner">Complete Beginner</option>
                  <option value="Some Experience">Some Experience</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                {errors.skillLevel && <p className="text-red-500 text-sm mt-1">{errors.skillLevel.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  {...register('preferredDate', { required: 'Please select a preferred date' })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
                {errors.preferredDate && <p className="text-red-500 text-sm mt-1">{errors.preferredDate.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time *
                </label>
                <select
                  {...register('preferredTime', { required: 'Please select a preferred time' })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select preferred time</option>
                  <option value="Morning (9AM - 12PM)">Morning (9AM - 12PM)</option>
                  <option value="Afternoon (12PM - 5PM)">Afternoon (12PM - 5PM)</option>
                  <option value="Evening (5PM - 8PM)">Evening (5PM - 8PM)</option>
                  <option value="Weekend">Weekend</option>
                </select>
                {errors.preferredTime && <p className="text-red-500 text-sm mt-1">{errors.preferredTime.message}</p>}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Message
              </label>
              <textarea
                {...register('message')}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Any specific requirements or questions?"
              />
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-8 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Schedule Training via WhatsApp
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Training;