import { act, Component } from 'react'

export default class index extends Component {
  state = {
    hour: 0,
    minute: 0,
    secunde: 0,
    active: false,
    timer: null,
    intervals: [],
  }
  startWatch = () => {
    const { timer } = this.state
    this.setState({
      active: true
    })
    let a = setInterval(() => {
      const { hour, minute, secunde } = this.state
      if (secunde < 59) {
        this.setState({
          secunde: secunde + 1
        })
      } else {
        if (minute < 59) {
          this.setState({
            secunde: 0,
            minute: minute + 1
          })
        } else {
          if (hour < 23) {
            this.setState({
              secunde: 0,
              minute: 0,
              hour: hour + 1
            })
          } else {
            this.setState({
              secunde: 0,
              minute: 0,
              hour: 0
            })
          }

        }
      }
    }, 1000);
    this.setState({
      timer: a
    })
  }
  stopWatch = () => {
    this.setState({
      active: false
    })
    clearInterval(this.state.timer)
  }
  clearWatch = () => {
    this.stopWatch()
    this.setState({
      secunde: 0,
      minute: 0,
      hour: 0
    })
  }
  intervalWatch = () => {
    const { secunde, minute, hour, intervals } = this.state
    intervals.push([hour < 10 ? '0' + hour : hour, minute < 10 ? '0' + minute : minute, secunde < 10 ? '0' + secunde : secunde,])
    this.setState({
      intervals: intervals
    })
  }
  deleteInter = (i) => {
    const { intervals } = this.state
    intervals.splice(i, 1)
    this.setState({
      intervals: intervals
    })
  }
  render() {
    const { hour, minute, secunde, active, intervals } = this.state
    return (
      <div className='flex justify-center mt-7'>
        <div className='w-[35%] bg-gray-100 rounded-lg p-6'>
          <div>
            <h1 className='text-3xl'>Stop Watch</h1>
          </div>
          <div>
            <p className='text-3xl flex gap-2 justify-center pt-7 items-center'>
              <span>{hour < 10 ? '0' + hour : hour}</span>
              <span>:</span>
              <span>{minute < 10 ? '0' + minute : minute}</span>
              <span>:</span>
              <span>{secunde < 10 ? '0' + secunde : secunde}</span>
            </p>
          </div>
          <div className='flex gap-2 pt-10'>
            <button disabled={active} onClick={this.startWatch} className='px-4 text-xl text-white bg-green-700'>Start</button>
            <button onClick={this.stopWatch} className='px-4 text-xl text-white bg-red-600'>Stop</button>
            <button onClick={this.clearWatch} className='px-4 text-xl text-white bg-orange-500'>Clear</button>
            <button onClick={this.intervalWatch} className='px-4 text-xl text-white bg-blue-700'>Interval</button>
          </div>
          <div className='pt-5 flex flex-col gap-1'>
            {
              intervals.map((item, i) => {
                return <div className='flex items-center justify-between' key={i}>
                  <p className='text-xl'>{item.join(" : ")}</p>
                  <button onClick={() => this.deleteInter(i)} className='bg-red-600 w-8 h-8 rounded flex justify-center items-center'>
                    <i className="fa-solid text-white fa-xmark"></i>
                  </button>
                </div>
              })
            }
          </div>
        </div>
      </div>
    )
  }
}
