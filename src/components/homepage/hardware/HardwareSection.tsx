import React from 'react';
import HardwareCard from './HardwareCard';
import SectionDivider from './SectionDivider';
import HorizontalScroll from './HorizontalScroll';

const HardwareSection: React.FC = () => {
  const powerShieldsData = [
    {
      title: "Li-ion 3.7V 2200mAh Cell",
      description: "Rechargeable battery cell providing stable power for portable or continuous system operations as main or backup power source.",
      imageUrl: "/images/Li-ion 3.7V 2200mAh Cell.jpg"
    },
    {
      title: "Battery Holder (2-cell)",
      description: "Securely holds batteries with proper electrical connections for safe and easy battery replacement or installation.",
      imageUrl: "/images/Battery Holder (2-cell).jpg"
    },
    {
      title: "Charging Module TP4056 (USB-C)",
      description: "Manages safe Li-ion battery charging via USB-C with overcharge protection for reliable battery performance.",
      imageUrl: "/images/Charging Module TP4056 (USB-C).jpg"
    },
    {
      title: "Step-Up Converter (Boost)",
      description: "Increases battery voltage to power 5V+ components, enabling low-voltage batteries to run higher-power devices.",
      imageUrl: "/images/Step-Up Converter (Boost).jpg"
    },
    {
      title: "Relay Module (4-Channel)",
      description: "Electronic switch for controlling high-power devices safely, isolating low-voltage circuits from high-voltage loads.",
      imageUrl: "/images/Relay Module (4-Channel).jpg"
    },
    {
      title: "Water Pump (12V DC)",
      description: "Moves or circulates water for cooling, irrigation, or liquid transfer in automated system operations.",
      imageUrl: "/images/Water Pump (12V DC).jpg"
    },
    {
      title: "Solenoid Valve (12V DC)",
      description: "Automatically controls liquid flow by opening/closing based on system signals for precise fluid automation.",
      imageUrl: "/images/Solenoid Valve.jpg"
    },
    {
      title: "Siren Alarm (12V)",
      description: "Produces loud emergency alerts to signal danger conditions and prompt quick response from nearby individuals.",
      imageUrl: "/images/Siren Alarm.jpg"
    },
    {
      title: "XRGB LED",
      description: "Multicolor LED providing visual status indicators and alerts for system monitoring and diagnostics.",
      imageUrl: "/images/XRGB LED.jpg"
    },
    {
      title: "Logic Level Converter",
      description: "Ensures voltage compatibility between controller and components, protecting devices from voltage mismatch damage.",
      imageUrl: "/images/Logic Level Converter.jpg"
    },
  ];

  return (
    <section id="hardware" className="py-12 sm:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">HARDWARE COMPONENTS</h1>
          <div className="w-20 sm:w-24 h-1 bg-teal-500 mx-auto"></div>
        </div>

        <div className="mb-8 sm:mb-12 animate-fade-in-up">
          <HardwareCard
            title="Flame Sensors"
            description="The flame sensor identifies the presence of fire by detecting infrared radiation emitted by flames. It serves as an early warning device, allowing prompt action to prevent potential fire hazards. This component is widely used in safety and monitoring systems for reliable fire detection."
            imageUrl="/images/FlameSensors.jpg"
            imagePosition="right"
          />
        </div>

        <div className="mb-8 sm:mb-12 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <HardwareCard
            title="MQ-2 Gas Sensor"
            description="The MQ-2 gas sensor detects the presence of combustible gases such as smoke, propane, methane, and LPG. It continuously monitors air quality to provide early warnings of gas leaks. This enhances safety by preventing fire and explosion risks in various environments."
            imageUrl="/images/MQ2GasSensor-.jpg"
            imagePosition="left"
          />
        </div>

        <SectionDivider label="MICROCONTROLLER" />

        <div className="mb-12 sm:mb-16 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <HardwareCard
            title="ESP32 Development Board"
            description="Serves as the main microcontroller responsible for reading sensor data, processing information, and controlling connected devices. It features built-in Wi-Fi and Bluetooth capabilities, allowing wireless communication and remote monitoring. This makes it ideal for smart systems and IoT-based applications that require both control and connectivity."
            imageUrl="/images/ESP32DevelopmentBoard.jpg"
            imagePosition="right"
          />
        </div>

        <SectionDivider label="POWER & SHIELDS" />

        <div className="animate-fade-in-up" style={{ animationDelay: '600ms' }}>
          <HorizontalScroll 
            items={powerShieldsData}
            title="Power & Shields Components"
          />
        </div>
      </div>
    </section>
  );
};

export default HardwareSection;