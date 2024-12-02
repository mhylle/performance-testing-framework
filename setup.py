from setuptools import setup, find_packages

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setup(
    name="performance-testing-framework",
    version="0.1.0",
    author="Performance Testing Framework Contributors",
    author_email="",
    description="A simple yet extensible performance testing framework for REST APIs",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/mhylle/performance-testing-framework",
    packages=find_packages(),
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.9",
        "Topic :: Software Development :: Testing",
    ],
    python_requires=">=3.9",
    install_requires=[
        "requests>=2.31.0",
        "pyyaml>=6.0.1",
        "statistics>=1.0.3.5"
    ],
)