import { NOW_TREND } from "../common/constants";

const Trend = () => {
    return(
        <div className="trend-container">
            <h1>나를 위한 트렌드</h1>
            <ul>
                {NOW_TREND.map((tr) => {
                    return (
                        <li key={tr.rank}>
                            <p>{tr.at}에서 트렌드</p>
                            {tr.word}
                            <p>{tr.desc}</p>
                            <p>{tr.retweet} posted</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Trend