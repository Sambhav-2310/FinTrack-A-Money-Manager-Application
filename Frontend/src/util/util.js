export const addThousandsSeparator = (num) => {
    if (num == null || isNaN(num)) return "";

    // Convert number to string to handle decimals
    const numStr  = num.toString();
    const parts = numStr.split("."); // Split into integer and fractional parts

    let integerPart = parts[0];
    let fractionalPart = parts[1];

    // Regex for Indian numbering system
    // It handles the first three digits, then every two digits
    const lastThree = integerPart.substring(integerPart.length - 3);
    const otherNumbers = integerPart.substring(0, integerPart.length - 3);

    if (otherNumbers !== "") {
        // Apply comma after every two digits for the 'otherNumbers' part
        const formattedOtherNumbers = otherNumbers.replace(
            /\B(?=(\d{2})+(?!\d))/g,
            ","
        );
        integerPart = formattedOtherNumbers + "," + lastThree;
    } else {
        integerPart = lastThree; // No change if less than 4 digits
    }

    // Combine integer and fractional parts
    return fractionalPart
        ? `${integerPart}.${fractionalPart}`
        : integerPart;
};

const prepareIncomeLineChartData = (incomeData = []) => {
    if (!Array.isArray(incomeData)) return [];

    const groupedData = incomeData.reduce((acc, income) => {
        const date = income.date;

        if (!acc[date]) {
            acc[date] = {
                date,
                totalAmount: 0,
                itemCount: 0,
                items: [],
            };
        }

        acc[date].totalAmount += Number(income.amount) || 0;
        acc[date].itemCount += 1;
        acc[date].items.push(income);

        return acc;
    }, {});

    const getOrdinal = (day) => {
        if (day > 3 && day < 21) return `${day}th`;

        switch (day % 10) {
            case 1:
                return `${day}st`;
            case 2:
                return `${day}nd`;
            case 3:
                return `${day}rd`;
            default:
                return `${day}th`;
        }
    };

    return Object.values(groupedData)
        .map((item) => {
            const d = new Date(item.date);

            return {
                ...item,
                month: `${getOrdinal(d.getDate())} ${d.toLocaleString("default", {
                    month: "short",
                })}`,
            };
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date));
};

export default prepareIncomeLineChartData;
